import unittest
from app.nlp.intent_classifier import predict_intent

class TestIntent(unittest.TestCase):
    def test_hours_intent(self):
        self.assertEqual(predict_intent("What are your hours?"), "hours")
    def test_location_intent(self):
        self.assertEqual(predict_intent("Where’s your store?"), "location")