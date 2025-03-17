from fastapi import FastAPI, Query
import yt_dlp
import openai
import os
import subprocess

app = FastAPI()

# API Key OpenAI
openai.api_key = "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"

# Fungsi Download Audio dari YouTube
def download_audio(video_url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{'key': 'FFmpegExtractAudio', 'preferredcodec': 'mp3'}],
        'outtmpl': 'audio.mp3',
        'noplaylist': True,
        'quiet': True
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])
    return "audio.mp3"

# Fungsi Transkripsi dengan OpenAI Whisper
def transcribe_audio(file_path):
    with open(file_path, "rb") as audio_file:
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
    return transcript["text"]

# Fungsi Analisis Teks dengan GPT-4
def analyze_text(text):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Pilih bagian terbaik yang menarik dan lucu dari teks transkripsi video YouTube."},
            {"role": "user", "content": text}
        ]
    )
    return response["choices"][0]["message"]["content"]

# API Endpoint
@app.get("/process")
def process_video(url: str):
    audio_file = download_audio(url)
    transcript = transcribe_audio(audio_file)
    highlights = analyze_text(transcript)
    
    return {"highlights": highlights}
