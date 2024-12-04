# **ContentCraft: AI-Powered Content Creation Platform**

## **Introduction**
ContentCraft is an AI-powered platform that revolutionizes content creation by leveraging cutting-edge AI models. It provides users with powerful tools to generate, rewrite, and craft content tailored to different platforms like LinkedIn, Instagram, blogs, and more. ContentCraft is designed to save time, boost creativity, and provide platform-specific customization.

As part of the ["Built-in AI Early Preview Program,"](https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit?pli=1&tab=t.0) ContentCraft leverages advanced AI capabilities like the Prompt API for seamless and dynamic content generation.
---

## **Features**
### **1. Prompt API**
- Generate unique video scripts or podcast outlines tailored to your needs.
- Input a prompt and get engaging content instantly.

### **2. Write API**
- Create captions optimized for social media platforms.
- Upload an image, and AI will extract features to suggest creative captions.

### **3. Rewrite API**
- Tailor content for different platforms, e.g., formal for LinkedIn or fun for Instagram.
- Easily copy generated content with a single click.

### **4. Innovative Design**
- Visually appealing UI with animated backgrounds and light/dark mode support.
- Responsive and intuitive design for all devices.

---

## **Technologies Used**
### **Frontend**
- **Framework:** Next.js
- **Styling:** Tailwind CSS with custom themes and animations

### **Backend**
- AI integrations using TensorFlow.js and MobileNet
- Advanced language model capabilities for real-time generation

### **APIs**
- Integration with AI language models for content generation and rewriting

### **Deployment**
- Hosted on [Vercel](https://vercel.com/) or your preferred platform.

---

## **Installation and Setup**

### **Prerequisites**
- **Node.js**: Install the latest version from [Node.js](https://nodejs.org/).
- **NPM** or **Yarn**: Package manager for dependencies.
- **Git**: For version control.

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/SuyashSalvi/contentcraft.git
   ```
2. Navigate to the project folder:
   ```bash
   cd contentcraft
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## **Folder Structure**
```plaintext
contentcraft/
│
├── app/                 # Application pages
│   ├── api/             # Backend API routes
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Main landing page
│   ├── prompt/          # Prompt API page
│   ├── rewrite/         # Rewrite API page
│   ├── write/           # Write API page
│
├── components/          # Reusable UI components
│   ├── Navbar/          # Navbar components
│   ├── Footer.tsx       # Footer component
│
├── public/              # Static assets (e.g., images, icons)
├── styles/              # Global and custom CSS styles
├── utils/               # Utility functions and API integrations
├── package.json         # Project dependencies
├── README.md            # Project documentation
```

---

## **Usage**

### **Prompt API**
1. Navigate to the **Prompt API** page.
2. Enter your prompt in the text box.
3. Click **Generate** to get your content.
4. Copy the content using the copy button.

### **Write API**
1. Navigate to the **Write API** page.
2. Upload an image, and the system will extract features using MobileNet.
3. Generate a caption based on the extracted features.

### **Rewrite API**
1. Navigate to the **Rewrite API** page.
2. Enter your content and choose the desired platform tone.
3. Click **Generate** to rewrite the content tailored to the selected platform.

---

## **Demo**
[Live Demo](https://your-project-live-link.com)

---

## **Screenshots**
### **Home Page**
- Add a screenshot of the home page with animated background and API feature cards.

### **Write API**
- Add a screenshot of the Write API page with image upload and generated captions.

### **Rewrite API**
- Add a screenshot of the Rewrite API page with rewritten content and copy functionality.

### **Prompt API**
- Add a screenshot of the Prompt API page with prompt submission and output generation.

---

## **Future Enhancements**
1. **Advanced AI Models:**
   - Integrate GPT models for more nuanced and human-like responses.
2. **Multi-Language Support:**
   - Enable content generation in multiple languages.
3. **Analytics Dashboard:**
   - Provide insights into generated content performance.
4. **User Personalization:**
   - Allow users to save preferences for tailored output.

---

## **Contributing**
We welcome contributions to make ContentCraft even better! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your branch and create a pull request:
   ```bash
   git push origin feature-name
   ```

---

## **Acknowledgments**
- Created by Ruchika and Suyash.
- **TensorFlow.js:** For image feature extraction using MobileNet.
- **OpenAI Language Models:** For advanced AI-driven content generation.
- **Tailwind CSS:** For rapid and responsive UI design.

---

Feel free to modify this README to fit your specific project details and preferences.
