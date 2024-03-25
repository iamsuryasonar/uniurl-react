# UNIURL - URL Sharing Platform

Welcome to UNIURL, a URL sharing platform that allows users to share all of their URLs with a single URL. With UNIURL, users can conveniently organize and manage their links, accessible through a unique username-based URL.

## Features

UNIURL offers a range of features to streamline URL sharing and management:

- **Single URL Sharing:** Share all your URLs using a single, customizable UNIURL link (e.g., `www.uniurl.com/username`).
- **Easy Organization:** Organize and manage your links effortlessly with UNIURL's intuitive interface.
- **Theming Options:** Customize the appearance of your UNIURL profile with various theming options.
- **Image Storage:** Store images associated with your URLs securely on AWS S3 for reliability and scalability.
- **Cache Management:** Utilize Redis for caching to optimize performance and enhance user experience.
- **Responsive Design:** Enjoy a seamless browsing experience across devices, thanks to the use of Tailwind CSS.

## Technologies Used

UNIURL leverages modern technologies to provide a robust and efficient platform:

- **Frontend:** Built with React and styled with Tailwind CSS for a responsive and visually appealing user interface.
- **Backend:** Powered by Node.js and Express.js, with MongoDB and Mongoose for database management.
- **Image Storage:** AWS S3 for secure storage of images associated with URLs.
- **Cache Management:** Redis for caching to optimize performance.
- **Theming:** Theming options available for users to customize their UNIURL profile.

## Getting Started

To get started with UNIURL, follow these simple steps:

1. Clone the repository:

```bash
git clone https://github.com/iamsuryasonar/urlshare-react.git
```
1. Navigate to the project directory:
```bash
cd urlshare-react
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
Create a .env file in the root directory with the following variables:
```makefile
PORT=3000
MONGO_URI=your_mongodb_uri
REDIS_URI=your_redis_uri
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET_NAME=your_aws_s3_bucket_name
```
4. Start the development server:
```bash
npm start
```
The application should now be running on http://localhost:3000.

### Images
user adds an url
![Screenshot from 2024-03-03 13-56-53](https://github.com/iamsuryasonar/urlshare-react/assets/79869026/f349282d-8660-41b3-99cf-1f93a5ae7a46)

can view own urls
![Screenshot from 2024-03-03 13-56-48](https://github.com/iamsuryasonar/urlshare-react/assets/79869026/9461d8b4-7361-4495-a3ee-f0454e8eef9f)

edit profile
![Screenshot from 2024-03-03 13-56-58](https://github.com/iamsuryasonar/urlshare-react/assets/79869026/fada1967-8727-4964-b7ce-5ececd2d6abe)

shared link can be used to view a users urls
![Screenshot from 2024-03-03 13-57-36](https://github.com/iamsuryasonar/urlshare-react/assets/79869026/29c9bfab-be73-4101-ae48-ba31cda4acf9)
