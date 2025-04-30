import React, { useEffect } from 'react'
import Markdown from 'react-markdown'
import Navbar from '../Components/Navbar';
import '../assets/diagram.svg'

const Docs = () => {

    useEffect(() => {
        // Get all h2 elements in the component
        const h2Tags = document.querySelectorAll('h2');

        // Loop through each h2 tag and assign the id
        h2Tags.forEach(h2 => {
          const content = h2.textContent.trim();
          const id = content.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with hyphens and convert to lowercase
          h2.id = id;
        });
      }, []); // Empty dependency array means this effect runs only once when the component mounts

    const report = `# Loan Approval Prediction System
_A Machine Learning and Web Integration Project_


---

## Project Overview
This system predicts **loan approval or rejection** for applicants based on **financial and demographic data**. It integrates **machine learning** with a **user-friendly web interface** to provide real-time decisions and explainability.

### Key Objectives:
- Automate loan approval decisions.
- Highlight factors influencing approvals/rejections.
- Offer intuitive visualizations for non-technical users.

---

## Dataset Description
The dataset consists of 4,269 entries with 11 features, categorized as:

Demographics:
- Number of dependents
- Education level
- Self-employed status

Financial Metrics:
- Annual income
- Loan amount
- Loan term

Asset Details:
- Residential asset value
- Commercial asset value
- Luxury asset value
- Bank asset value

Creditworthiness:
- CIBIL score (credit score)

Target Variable:
Loan status → Approved (0) / Rejected (1)

---

## Model Selection: Why Random Forest?

### Comparison with Alternatives:
1. Random Forest: Handles non-linear patterns, robust to imbalance, provides feature importance but less interpretable than linear models.
2. Logistic Regression: Offers interpretable coefficients but performs poorly on non-linear data.
3. XGBoost: Delivers high accuracy and handles imbalance but requires complex hyperparameter tuning.

### Why Random Forest Won:
- Handles imbalanced data effectively by adjusting 'class_weight'.
- Provides feature importance insights, with CIBIL score contributing 59% to decisions.
- Stability ensured by limiting tree depth ('max_depth=5') to reduce overfitting.

---

## System Workflow

### Data Preprocessing:
- Engineered features like 'debt_to_income_ratio' (loan amount divided by annual income) and 'total_assets' (sum of residential, commercial, luxury, and bank assets).
- Addressed missing values and outliers.

### Model Training:
- Random Forest Classifier achieved 92% test accuracy.
- Optimized for precision in rejections (89%), prioritizing avoiding false approvals.

---

## Key Features

### Web Application (ReactJS):
Frontend:
1. Input form collects applicant details.
2. Dynamic result display shows approval/rejection status.

Visualizations:
1. Pie charts illustrate factor importance (e.g., income vs. loan amount).
2. Force plots explain rejection reasons, such as low credit scores.

Backend (Flask API):
1. Processes requests and runs model inference.
2. Returns predictions with SHAP values for real-time responses.

Example rejection reason: "Loan rejected due to low credit score (218/900) and high loan-to-income ratio (3.1x)."

---

## Web Integration Architecture

![Image Description](https://i.imgur.com/UIUnQUA.png)

Workflow:
1. User submits application via React frontend.
2. Flask API preprocesses data and runs the Random Forest model.
3. Predictions and SHAP values are returned to the frontend for display.

---

## Explainability and Visualization

Explainability is achieved through SHAP (SHapley Additive exPlanations):

Global Insights:
1. CIBIL score contributes 59% impact.
2. Loan amount is another dominant factor.

Local Insights for Rejected Applicants:
1. Low credit score (-40%) and high debt-to-income ratio (-25%) are negative factors.
2. High asset value (+15%) is positive but insufficient for approval.

Interactive visualizations allow users to toggle between "Approval Factors" and "Rejection Reasons."

---

## Challenges and Solutions

Challenges:
1. Class imbalance (65% approved).
2. Real-time SHAP computation latency.
3. Frontend-backend data flow consistency.

Solutions:
1. Used 'class_weight=balanced' in Random Forest to address imbalance.
2. Preloaded SHAP explainer to reduce latency.
3. Standardized JSON schema for predictions.

---

## Future Enhancements

1. Bias Mitigation: Integrating fairness checks for demographic factors to ensure equitable decisions.
2. Model Monitoring: Tracking performance drift over time to maintain accuracy.
3. Mobile Optimization: Developing a Progressive Web App (PWA) for broader accessibility.

---

## Conclusion

The system bridges automation and transparency by achieving 92% test accuracy while leveraging SHAP for explanations. Its React-Flask architecture ensures scalability while empowering lenders/applicants with informed decisions, combining high accuracy with user-centric design.

---
`

const indexing = `

## Table of Contents
1. [Project Overview](#project-overview)
2. [Dataset Description](#dataset-description)
3. [Model Selection: Why Random Forest?](#model-selection:-why-random-forest?)
4. [System Workflow](#system-workflow)
5. [Key Features](#key-features)
6. [Web Integration Architecture](#web-integration-architecture)
7. [Explainability and Visualization](#explainability-and-visualization)
8. [Challenges and Solutions](#challenges-and-solutions)
9. [Future Enhancements](#future-enhancements)
10. [Conclusion](#conclusion)

`

  return (
    <div>
          <Navbar />
            <div className='grid grid-cols-3 gap-5 px-10 col-temp'>
    <div className='prose prose-invert text-neutral-200 px-10 my-10 mt-0 w-full min-w-full mx-auto bg-neutral-900 py-10 rounded'>
        <Markdown>
            {indexing}
        </Markdown>
    </div>
        <div className='col-span-2 prose prose-invert text-neutral-200 px-10 my-10 mt-0 w-full min-w-full mx-auto bg-neutral-900 py-10 rounded'>
            <Markdown>
                {report}
            </Markdown>
        </div>
    </div>
    </div>
  )
}

export default Docs
