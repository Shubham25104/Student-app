# Student Resume Builder App

This is a React-based student resume builder application created with Vite. It allows students to input their personal and academic information, preview their resume live, and download it as a PDF. The app stores data locally in the browser to preserve user input between sessions.

## Features

- **Live Resume Preview:** As you enter your information, the resume preview updates in real-time on the same page.
- **Download Resume as PDF:** Export your resume as a PDF file that matches the live preview.
- **Local Storage Persistence:** Your data is saved in the browser's local storage, so it remains available even if you refresh or close the page.
- **Responsive Design:** The app layout adapts to different screen sizes for usability on desktops, tablets, and mobile devices.
- **Default Profile Image:** Displays a default logo if no profile image is uploaded.
- **Multiple Projects:** Add multiple projects with names and URLs, with the ability to add or remove projects dynamically.
- **Social Links:** Add GitHub and LinkedIn usernames, which are displayed as clickable links in the resume.
- **Date of Birth Field:** Includes a DOB field for personal information.
- **Clean and Modern UI:** Styled with CSS for a professional look.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shubham25104/Student-app.git
   cd Student-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:3000`).

## Usage

- Fill in your personal details, education, skills, projects, experience, and social links in the form.
- The resume preview updates live on the right side.
- Upload a profile image or use the default logo.
- Click the "Download Resume as PDF" button to save your resume.
- Your data is saved automatically in local storage.

## Technologies Used

- React
- Vite
- jsPDF (for PDF generation)
- html2canvas (for capturing resume preview as image)
- CSS Flexbox for responsive layout

## Project Structure

- `src/App.jsx` - Main React component with form and resume preview.
- `src/App.css` - Styling for the app.
- `src/assets/logo.png` - Default profile image.
- Other standard Vite project files.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is open source and available under the MIT License.

## Contact

For any questions or feedback, please contact the repository owner.

---
Thank you for using the Student Resume Builder App!
