import Image from 'next/image';

export const Profile = () => (
    <Image
        src="/images/profile.png" // Route of the image file
        height={280} // Desired size with correct aspect ratio
        width={300} // Desired size with correct aspect ratio
        alt="Your Name"
    />
);
