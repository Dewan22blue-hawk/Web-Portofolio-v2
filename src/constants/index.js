import { mobile, backend, creator, web, javascript, typescript, html, css, reactjs, tailwind, nodejs, mongodb, git, figma, codeigniter, sagitaNet, ubsi, carrent, stasiunRoti, laradev, php, laravel, mobileApp } from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "certificate",
    title: "Certificate",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Mobile Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "IT Support",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Laravel",
    icon: laravel,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "PHP",
    icon: php,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "codeigniter",
    icon: codeigniter,
  },
];

const experiences = [
  {
    title: "Network Engineer Technician",
    company_name: "Sedjajar.net",
    icon: sagitaNet,
    iconBg: "#383E56",
    date: "March 2020 - May 2022",
    points: [
      "Installation and Configuration: Oversee the installation of network hardware and software components, such as routers, switches, access points, and fiber optic equipment, ensuring all systems are configured correctly and efficiently.",
      "Troubleshooting and Maintenance: Proactively monitor network performance and resolve complex technical issues, minimizing downtime and ensuring uninterrupted service for end-users.",
      "Documentation and Reporting: Maintain detailed records of network configurations, installations, and maintenance activities to ensure transparency and facilitate ongoing network management.",
      "Client Consultation and Support: Collaborate closely with clients to understand their networking requirements, provide expert recommendations, and deliver comprehensive support throughout the entire project lifecycle.",
    ],
  },
  {
    title: "Assistant Technical Support",
    company_name: "Bina Sarana Informatika University",
    icon: ubsi,
    date: "Jan 2023 - Present",
    points: [
      "Network Configuration and Installation: Assisted in setting up and configuring network devices, including routers, switches, and access points, to optimize connectivity and performance.",
      "Technical Troubleshooting: Provided first-line support by diagnosing and resolving issues related to hardware, software, and network components, ensuring minimal disruption to users.",
      "CCTV and Network Installation: Supported the installation and maintenance of CCTV systems, including configuring cameras and ensuring secure network integration.",
      "Hardware and Software Maintenance: Performed regular maintenance tasks, including software updates, hardware repairs, and system optimizations, to maintain operational efficiency.",
      "User Support: Actively assisted end-users with their daily technical needs, including troubleshooting software and hardware issues, providing guidance on web applications, and supporting basic programming tasks.",
      "Collaborative Problem-Solving: Worked closely with the technical support team to identify recurring issues, develop solutions, and implement best practices for enhanced system performance.",
    ],
  },
];

const testimonials = [
  {
    testimonial: "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Wahyu Trie",
    designation: "Friend Team",
    company: "Hawk's",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    testimonial: "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Falah Anugerah",
    designation: "Network Administrator Team",
    company: "Privy ID",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    testimonial: "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Nanda AJx",
    designation: "Staff",
    company: "PLN BUMN",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];

const projects = [
  {
    name: "Report Desk App",
    description: "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "Codeigniter 4",
        color: "blue-text-gradient",
      },
      {
        name: "PHP Code",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/hawk-xc/CI4-spark/tree/master/report_desk_wapl",
  },
  {
    name: "Stasiun Roti",
    description:
      "Landing page for Stasiun Roti, a bakery in Surakarta, showcasing their range of freshly baked goods. The site features an elegant and user-friendly design, highlighting the bakery’s offerings, values, and atmosphere, with responsive design to provide a seamless experience across all devices.",
    tags: [
      {
        name: "HTML 5",
        color: "blue-text-gradient",
      },
      {
        name: "CSS 3",
        color: "green-text-gradient",
      },
      {
        name: "Bootstrap",
        color: "pink-text-gradient",
      },
      {
        name: "JQuery",
        color: "blue-text-gradient",
      },
    ],
    image: stasiunRoti,
    source_code_link: "https://github.com/Dewan22blue-hawk/website-kelompok",
  },
  {
    name: "Laradev E-Antrean Web Apps",
    description: "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "Laravel-API",
        color: "blue-text-gradient",
      },
      {
        name: "Laravel-Livewire",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: laradev,
    source_code_link: "https://github.com/hawk-xc/Laradev_e_antrean",
  },
  {
    name: "Mobile Apps E-Antrean",
    description: "This project is a continuation of Laradev E-Antrean, where the application is integrated with Mobile Apps made using Flutter using Laravel Sanctum APIs.",
    tags: [
      {
        name: "Flutter",
        color: "blue-text-gradient",
      },
    ],
    image: mobileApp,
    source_code_link: "https://github.com/hawk-xc/Flutter_e_antrean",
  },
];

export { services, technologies, experiences, testimonials, projects };
