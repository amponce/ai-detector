# AI Text Detection App

This is a Next.js application that utilizes the Hugging Face AI model to detect whether a given text is real or AI-generated. The app leverages the power of the `openai-community/roberta-base-openai-detector` model hosted on the Hugging Face platform.

## Features

- User-friendly interface for entering text to be analyzed
- Integration with the Hugging Face API for AI text detection
- Real-time feedback on the authenticity of the entered text
- Progress indicator to provide visual feedback during the detection process
- Error handling and user guidance for optimal results

## Technologies Used

- Next.js: A React framework for building server-rendered applications
- React: A JavaScript library for building user interfaces
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript
- Axios: A promise-based HTTP client for making API requests
- Tailwind CSS: A utility-first CSS framework for rapid UI development
- Hugging Face API: A platform that provides access to state-of-the-art AI models

## Hugging Face Model

The AI text detection functionality of this app is powered by the `openai-community/roberta-base-openai-detector` model from the Hugging Face platform. This model is a RoBERTa-based detector trained to distinguish between real and AI-generated text.

The RoBERTa (Robustly Optimized BERT Pretraining Approach) model is a variation of BERT (Bidirectional Encoder Representations from Transformers) that has been optimized for better performance on downstream tasks. It is pre-trained on a large corpus of text data and can be fine-tuned for specific tasks, such as text classification or detection.

The `openai-community/roberta-base-openai-detector` model has been specifically trained to detect AI-generated text, making it suitable for our application. By leveraging this model, we can provide users with an accurate assessment of whether a given piece of text is likely to be real or AI-generated.

## Getting Started

To run the AI Text Detection App locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install the dependencies:
   ```bash
   cd <project-directory>
   npm install
   ```

3. Set up the Hugging Face API token:
   - Sign up for a Hugging Face account (if you don't have one already)
   - Create an API token on the Hugging Face platform
   - Create a `.env.local` file in the project root directory
   - Add the following line to the `.env.local` file:
     ```
     HF_API_TOKEN=your-api-token
     ```
     Replace `your-api-token` with your actual Hugging Face API token.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the AI Text Detection App.

## Deployment

To deploy the AI Text Detection App, you can use platforms like Vercel or Netlify. Make sure to set the `HF_API_TOKEN` environment variable in your deployment settings with your Hugging Face API token.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.