from flask import Flask, render_template, jsonify, send_file
from SentimentAnalysis import analyze_sentiment, generate_pie_chart
import os
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # This loads your HTML page

@app.route('/analyze')
def analyze():
    return render_template('analyze.html')

@app.route('/getData/<product_name>', methods=['GET'])
def get_data(product_name):
    try:
        sentiments = analyze_sentiment(product_name)
        generate_pie_chart(product_name, sentiments)

        # Load top comments
        with open('sentiment_comments.json') as f:
            comments = json.load(f)

        return jsonify({
            'imagePath': '/getImage',
            'topComments': comments
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/getImage')
def get_image():
    return send_file('sentiment_chart.png', mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, port=3000)
