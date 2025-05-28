# The BronxBoard

Welcome to **The BronxBoard** – a dedicated Learning Management System (LMS) built exclusively for the vibrant youth of the Bronx!

**The BronxBoard** provides access to community-focused courses on civic education, life skills, and personal development. Accredited by an authorized educational body, it ensures quality and recognition, empowering teens to take control of their education and future. Our platform encourages positive engagement, reduces gang influence, and promotes healthy decision-making for Bronx youth.

---
## 📚 Navigation

* [Features](#-features)
* [Setup Instructions](#️-setup-instructions)

  * [Backend (Django + Python)](#1️⃣-backend-django--python)
  * [Frontend (Node.js)](#2️⃣-frontend-nodejs)
* [Contributing](#-contributing)
* [Contact](#-contact)
---

## 🌟 Features

- ✅ **AI-Powered LMS**
Engaging, adaptive learning experiences designed with AI to cater to every learner's needs.

- ✅ **AI-Generated Quizzes**
Dynamic quizzes created on the fly, tailored to test and challenge your understanding.

- ✅ **AI-Evaluated Answers**
Instant, AI-powered feedback and grading to accelerate your learning journey.

- ✅ **Skills & Welfare Resources**
A curated library of resources focused on skill development and welfare for Bronx teens.

✅ **Daily Email News**
Stay informed with Bronx-specific news updates and AI-suggested learning topics in your inbox every morning!

---

## ⚙️ Setup Instructions

### 1️⃣ Backend (Django + Python)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/MustafaMunir123/theBronxBoard.git
   ```

2. **Create a Virtual Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   # or
   venv\Scripts\activate     # Windows
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations & Start Server**

   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

---

### 2️⃣ Frontend (Node.js)

1. **Navigate to Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Fill the .env**
```bash
NEWS_API_KEY=        # https://www.thenewsapi.com/
GROQ_TOKEN=          # https://console.groq.com/home


EMAIL_HOST=          # smtp.gmail.com
EMAIL_PORT=          # 587
EMAIL_HOST_USER=     # gmail
EMAIL_HOST_PASSWORD= # gmail app password
EMAIL_USE_TLS=       # True

```
---

## 💡 Contributing

We welcome contributions from anyone passionate about empowering the Bronx youth! Please feel free to fork, open issues, and make pull requests.

---

## 📬 Contact

Have questions or want to join our mission? Drop us a message at \[[mustafamunir10@gmail.com](mailto:mustafamunir10@gmail.com)].

---

🚀 **Let’s build a smarter, more connected Bronx together!**

---
