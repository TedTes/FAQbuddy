import spacy
nlp = spacy.load("en_core_web_sm")

def preprocess_text(text):
    doc = nlp(text.lower())
    tokens = [token.text for token in doc if not token.is_punct]
    return tokens


from gensim.models import FastText
import numpy as np

# Load pretrained FastText (download first time)
fasttext_model = FastText.load_fasttext_format("cc.en.300.bin")  # Download from gensim-data or FastText site

def get_embedding(tokens):
    vectors = [fasttext_model.wv[token] for token in tokens if token in fasttext_model.wv]
    return np.mean(vectors, axis=0) if vectors else np.zeros(300)


print(get_embedding(['wi-fi', 'password']).shape)





import torch
import torch.nn as nn

class FAQClassifier(nn.Module):
    def __init__(self, input_dim=300, hidden_dim=256, output_dim=20):  # 20 for now, scale to 500-1000 later
        super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, hidden_dim)
        self.fc3 = nn.Linear(hidden_dim, output_dim)
        self.dropout = nn.Dropout(0.3)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x