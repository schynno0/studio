export interface EducationEntry {
  examination: string;
  university: string;
  institute: string;
  year: string;
  grade: string;
}

export interface ProjectEntry {
  title: string;
  duration: string;
  category: "tech" | "managerial";
  description: string[];
  technologies?: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  contact: {
    gender: string;
    dob: string;
    email: string;
    phone?: string; // Added phone number field
  };
  education: EducationEntry[];
  auxiliaryDegree: string;
  scholasticAchievements: string[];
  projects: ProjectEntry[];
  technicalSkills: SkillCategory[];
  relevantCoursework: Record<string, string[]>;
  extracurriculars: Record<string, string[]>;
}

export const resumeData: ResumeData = {
  name: "Sachin Yadav",
  title: "Engineering Physics, Indian Institute of Technology Bombay",
  contact: {
    gender: "Male",
    dob: "25/12/2003",
    email: "sachin221842@gmail.com",
    phone: "+91 9729284475", // Added phone number
  },
  education: [
    {
      examination: "Graduation (B.Tech.)",
      university: "IIT Bombay",
      institute: "IIT Bombay",
      year: "2026 (Present)",
      grade: "8.01 CPI",
    },
    {
      examination: "Intermediate",
      university: "CBSE",
      institute: "Vivekanand Sr Sec School",
      year: "2021",
      grade: "90.20%",
    },
    {
      examination: "Matriculation",
      university: "CBSE",
      institute: "Vivekanand Sr Sec School",
      year: "2019",
      grade: "96.60%",
    },
  ],
  auxiliaryDegree:
    "Pursuing dual Minor Degrees in Computer Science and Engineering and AI & Data Science",
  scholasticAchievements: [
    "Scored 7 perfect AA grades in various academic courses in engineering physics programme.",
    "Secured top 1.6 percentile all over India in JEE Main examination among 1 million+ candidates.(’22)",
    "Bagged top 4.2 percentile all over India in JEE Advanced exam among 0.17 million+ candidates.(’22)",
  ],
  projects: [
    {
      title: "Optimizing Stock Trading Strategy Using Reinforcement Learning",
      duration: "Jun ’23 - Jul ’23",
      category: "tech",
      description: [
        "Engineered an RL framework to optimize stock returns using Deep Q Networks with historical and real-time data.",
        "Utilized the Proximal Policy Optimization (PPO) algorithm and OpenAI Gym to create and fine-tune RL models, providing a comprehensive and detailed analysis by comparing the returns with those of the ARIMA predictive model.",
        "Analyzed the benefits and drawbacks of Reinforcement Learning techniques versus conventional trading strategies.",
      ],
      technologies: [
        "Reinforcement Learning",
        "Deep Q Networks",
        "PPO",
        "OpenAI Gym",
        "ARIMA",
      ],
    },
    {
      title: "Integrated Reconnaissance System for Defense Threat Analysis",
      duration: "Dec ’23 - Jan ’24",
      category: "tech",
      description: [
        "Engineered a defense solution using (CNN) and Large Language and Vision Assistant (LLAVA) for threat recognition enhances situational awareness by processing visual data with CNN and providing explanations through LLAVA.",
        "Proficiently implementing and optimizing the YOLO (You Only Look Once) algorithm for efficient and accurate object detection. Contributed in deep learning-based object detection, with focus on applications like object tracking.",
      ],
      technologies: ["CNN", "LLAVA", "YOLO", "Object Detection"],
    },
    {
      title: "Deep Learning And Neural Networks",
      duration: "May ’24 - Present",
      category: "tech",
      description: [
        "Built, trained neural networks using TensorFlow/Keras, implementing CNNs for MNIST digit classification.",
        "Explored and applied advanced neural network techniques such as regularization, transfer learning, and RNNs.",
        "Executed image super-resolution projects using SRCNN and EDSR, training models on MNIST and DIV2K datasets.",
      ],
      technologies: [
        "TensorFlow",
        "Keras",
        "CNN",
        "RNN",
        "SRCNN",
        "EDSR",
        "MNIST",
        "DIV2K",
      ],
    },
    {
      title: "MFET of Polymers: ROUSE and LJ Models",
      duration: "Jan ’25 - Apr ’25",
      category: "tech",
      description: [
        "Conducted a study on the Mean First Encounter Time (MFET) of polymers using ROUSE and Lennard-Jones (LJ) models.",
        "Implemented molecular dynamics simulations to analyze the scaling of MFET with polymer length and interaction strength.",
        "Explored the structural changes and position-dependent MFET in long polymer chains.",
        "Proposed future directions involving enhancer-promoter interactions, loop extrusion mechanisms, and protein-mediated interactions in chromatin dynamics.",
      ],
      technologies: [
        "ROUSE Model",
        "LJ Model",
        "Molecular Dynamics",
        "LAMMPS",
        "Python",
      ],
    },
    {
      title: "LIGO on a Breadboard",
      duration: "Oct ’23 - Dec ’23",
      category: "tech",
      description: [
        "Engineered a closed-loop system using Op-amp and LED with a phototransistor to provide real-time feedback.",
        "Designed a Proportional Controller with a single differential amplifier for calculating and responding to error signals.",
        "Tuned the proportionality parameter to ensure robust performance under different external lighting disturbances.",
      ],
      technologies: [
        "Analog Electronics",
        "Op-amp",
        "Phototransistor",
        "Proportional Controller",
      ],
    },
    {
      title: "PID Controlled Stewart’s Platform",
      duration: "Mar ’24 - Apr ’24",
      category: "tech",
      description: [
        "Constructed a 1-D Stewart platform using readily available and affordable materials for cost-effective prototyping.",
        "Integrated optical encoders, ultrasonic sensors, and servo motors to achieve accurate platform control and feedback.",
        "Applied PID control using Arduino UNO to ensure stable platform movements and accurate convergence to setpoint.",
      ],
      technologies: [
        "PID Control",
        "Arduino UNO",
        "Optical Encoders",
        "Ultrasonic Sensors",
        "Servo Motors",
      ],
    },
    {
      title: "Autonomus Bot With Automatic Path Retracing",
      duration: "Jan ’23 - Feb ’23",
      category: "tech",
      description: [
        "Implemented HC-SR04 ultrasonic module for object detection, IR sensors for path Identification, L298N Motor Driver for varying speed and programmed micro-controller (Arduino Uno)for controlling various motors and Sensors.",
        "Led a team of 6, designed an intricate 3D model for 3D printing in Fusion 360, balancing function and aesthetics.",
        "Demonstrated teamwork and project management skills, as a team delivering a standout project out of 120 teams.",
      ],
      technologies: [
        "Arduino Uno",
        "HC-SR04",
        "IR Sensors",
        "L298N",
        "Fusion 360",
      ],
    },
    {
      title: "Option Pricing Models",
      duration: "Jun ’24 - Present",
      category: "tech",
      description: [
        "Orchestated a team of 4 to implement option pricing models using the Black-Scholes and Binomial framework.",
        "Conducted Python-based Monte Carlo simulations with an average of 10000 iterations to estimate the option prices.",
        "Achieved a 90% accuracy rate through validation of Monte Carlo simulations against historical data and market priceData Structures And Algorithms.",
      ],
      technologies: [
        "Python",
        "Black-Scholes",
        "Binomial Model",
        "Monte Carlo Simulation",
      ],
    },
    {
      title: "Data Structures And Algorithms",
      duration: "May ’23 - Jul ’23",
      category: "tech",
      description: [
        "Skilled in wide range of data structures, including trees, lists, maps, queues, hash tables, stacks, and AVL trees.",
        "Mastered some essential algorithms like the KMP algorithm, Dijkstra’s, Bellman-Ford, Prim’s, and Kruskal’s algorithms, as well as Depth-First and Breadth-First algorithms and tackled some advanced problem using algorithms.",
        "Proficiently employed OOP principles to ingeniously design and optimize solutions for the Tower of Hanoi game.",
      ],
      technologies: ["Data Structures", "Algorithms", "OOP"],
    },
    {
      title: "Prototype of a UV Air Purifier",
      duration: "Feb ’24 - Apr ’24",
      category: "managerial",
      description: [
        "Developed a working prototype of a UV air purifier for use in hostels, addressing hygiene issues in hostel rooms.",
        "Demonstrated excellent product management skills by successfully managing tech, design and mechanical teams of 6 to deliver a standout product among 220+ competing teams using budget-friendly components for efficient operation.",
      ],
    },
    {
      title: "Management And Business Developement",
      duration: "Jun ’23 - Jul ’23",
      category: "managerial",
      description: [
        "Gained knowledge in Product Management, integrating fundamental principles across Sales, Marketing, Customer Acquisition and Project Management domains to drive comprehensive business success and growth.",
        "Applied theoretical knowledge to real-world companies, translating concepts into highly effective practical solutions.",
        "Studied concepts like SWOT analysis, search engine marketing, Theory of Constraints, and Gantt Charts.",
      ],
    },
    {
      title: "Pitch And Present",
      duration: "May ’23 - Jun ’23",
      category: "managerial",
      description: [
        "Led a team of 5 to study an emerging startup in the casual wear space from its origin to present The Souled Store.",
        "Created a Pitch Deck explaining revenue model, target customers, CVP and many other aspect of The Souled Store.",
        "Presented our project findings via video, pitched the startup, and participated in a QnA session before 250+ students.",
      ],
    },
  ],
  technicalSkills: [
    {
      name: "Development & Simulation",
      skills: [
        "Python",
        "C",
        "C++",
        "Arduino IDE",
        "LATEX",
        "Matlab",
        "HTML",
        "CSS",
        "MS Office",
      ],
    },
    {
      name: "Libraries & Other Tools",
      skills: [
        "Numpy",
        "Pandas",
        "Matplotlib",
        "Scikit-learn",
        "Statsmodel",
        "AutoDesk Fusion 360",
        "Git",
      ],
    },
  ],
  relevantCoursework: {
    Physics: [
      "Waves and Oscillations",
      "Thermal Physics",
      "Quantum Mechanics",
      "Classical Mechanics",
      "Statistical physics",
      "Quantum Mechanics II",
    ],
    Mathematics: [
      "Calculus I and II",
      "Linear Algebra",
      "Differential Equations I",
      "Complex Analysis",
      "Integral Transforms",
      "Numerical Analysis",
    ],
    "CS & Electronics": [
      "Computer Programming and Utilisation",
      "Logic For Computer Science",
      "Makerspace (introducing the Mechanical and Electrical aspects of engineering)",
      "Analog Electronics",
      "Digital Electronics and Microprocessors",
    ],
    "Data Science": ["AI and Data Science", "Introduction to Machine Learning"],
    HASMED: [
      "Introduction to Entrepreneurship",
      "Introduction to The Arts",
      "Economics",
      "Design thinking for innovation",
    ],
  },
  extracurriculars: {
    Competitions: [
      "Represented Hostel 5 in the Cricket GC (general chamionship) held at IIT Bombay (’24)",
      "Attained a position in the top 10 teams in SARCasm, a cryptic hunt competition by SARC (’23)",
      "Engaged and Participated in annual national level business quiz competition (InQube) (’23)",
    ],
    Sports: [
      "Completed a yearlong intensive training programme under NCC, IIT Bombay (’23)",
      "Got selected in NCC volleyball team and continued to play yearlong for NCC volleyball team (’23)",
      "Learnt various survival skills like camping, map reading, direction finding in NCC (’23)",
      "Participated in inter-school sports event, showcasing skills & teamwork in football (’20)",
    ],
    Social: [
      "Engaged in Versova Beach Cleanup & Awareness Campaign by Abhyuday, IIT Bombay (’23)",
      "Participated in various IITB site cleanup under NCC IITB including mega powai lake cleanup (’23)",
    ],
    Others: [
      "Attended the annual Entrepreneurship Summit conducted by E-cell, IIT Bombay (’23)",
      "Attended a day bootcamp on Retention Marketing conducted by WebEngage in Bombay (’23)",
    ],
  },
};
