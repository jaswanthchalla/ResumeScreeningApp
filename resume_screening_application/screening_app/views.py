from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import spacy
import fitz  # PyMuPDF
import docx2txt
from sentence_transformers import SentenceTransformer, util
from spacy.matcher import PhraseMatcher


nlp = spacy.load("en_core_web_sm")
model = SentenceTransformer('all-MiniLM-L6-v2')

class ResumeScreeningAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        jd_text = request.data.get('job_description', '')
        files = request.FILES.getlist('resumes')

        if not jd_text or not files:
            return Response({"error": "Job description and at least one resume are required."}, status=400)

        jd_skills = self.extract_keywords_from_jd(jd_text)
        jd_embedding = model.encode(jd_text, convert_to_tensor=True)

        total_jd_skills = len(jd_skills)
        results = []

        for file in files:
            resume_text = self.extract_text(file)
            matched_skills = self.extract_info(resume_text, jd_skills)
            resume_embedding = model.encode(resume_text, convert_to_tensor=True)
            semantic_similarity = util.cos_sim(jd_embedding, resume_embedding).item()
            skill_score = len(matched_skills) / total_jd_skills if total_jd_skills else 0
            final_score = round(0.7 * semantic_similarity + 0.3 * skill_score, 2)

            results.append({
                "name": file.name,
                "matched_skills": matched_skills,
                "semantic_similarity": round(semantic_similarity, 2),
                "skill_match_ratio": round(skill_score, 2),
                "final_score": final_score
            })

        ranked = sorted(results, key=lambda x: x['final_score'], reverse=True)
        return Response(ranked)

    def extract_text(self, file):
        if file.name.endswith('.pdf'):
            return self.extract_text_from_pdf(file)
        elif file.name.endswith('.docx'):
            return docx2txt.process(file)
        return ''

    def extract_text_from_pdf(self, pdf_file):
        text = ''
        with fitz.open(stream=pdf_file.read(), filetype='pdf') as doc:
            for page in doc:
                text += page.get_text()
        return text

    def extract_keywords_from_jd(self, jd_text):
        doc = nlp(jd_text.lower())
        skills = set()
        for chunk in doc.noun_chunks:
            phrase = chunk.text.strip()
            if 1 <= len(phrase.split()) <= 3:
                skills.add(phrase)
        return list(skills)

    def extract_info(self, resume_text, jd_skills):
        matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
        patterns = [nlp.make_doc(skill) for skill in jd_skills]
        matcher.add("SKILLS", patterns)
        doc = nlp(resume_text.lower())
        matches = matcher(doc)
        return sorted(set([doc[start:end].text for match_id, start, end in matches]))