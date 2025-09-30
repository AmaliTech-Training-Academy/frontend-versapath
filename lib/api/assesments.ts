import { AssessmentStatus, AssessmentType, Roles } from "../types";
import user from "@/public/images/user-placeholder.png";

export const MentorAssessments = [
    {
        id: "1",
        title: "React Component Lab",
        description: "Build a reusable component library with proper TypeScript definitions",
        type: AssessmentType.CODE_LAB,
        status: AssessmentStatus.DRAFT,
        createdAt: "Sep 23. 2025, 10:30",
        tags: ["React", "TypeScript", "Components"],
        assigned: [
            {
                id: "dfhn-vjdsasdkf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdhdgdrtskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdtyjuskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vnbvfjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            }
        ],
        content: {
            learningObjectives: [
                "React Basics: Understand functional components and how they differ from class components.",
                "Props: Learn to pass data into components to make them reusable.",
                "State: Manage component-level state using the useState hook.",
                "Event Handling: Add interactivity with event listeners in React.",
                "Conditional Rendering: Dynamically show or hide UI elements based on component state.",
                "Component Composition: Build a UI by combining smaller, reusable components"
            ],
            projectSetup: [
                "Get the project files: Download the starter project form the link provided by the trainer.",
                "Set up the environment: Ensure Node.js and npm/yarn are installed. Run npm install (or yarn install) to set up dependencies.",
                "Start the development server: Run npm start (or yarn start) and confirm the starter app run in the browser."
            ],
            tasks: [
                {
                    task: "Create Component",
                    subtasks: [
                        "Make a functional component (e.g., AdviceCard.jsx).",
                        "Add a title, advice text, and a button."
                    ]
                },
                {
                    task: "Props",
                    subtasks: [
                        "Pass advice text as a prop.",
                        "Render it inside the component."
                    ]
                },
                {
                    task: "State & Events",
                    subtasks: [
                        "Use useState for advice text.",
                        "Update state when the button is clicked."
                    ]
                },
                {
                    task: "Conditional Rendering",
                    subtasks: [
                        "show 'Loading...' while fetching."
                    ]
                }
            ]
        }
    },
    {
        id: "2",
        title: "React Component Lab",
        description: "Build a reusable component library with proper TypeScript definitions",
        type: AssessmentType.CODE_LAB,
        status: AssessmentStatus.ACTIVE,
        createdAt: "Sep 23. 2025, 10:30",
        tags: ["React", "TypeScript", "Components"],
        assigned: [
            {
                id: "dfhn-vjdsyujkjyfrtkf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjhgjhgfdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjds6t5456kf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdedxgfdhyr6tskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            }
        ],
        content: {
            learningObjectives: [
                "React Basics: Understand functional components and how they differ from class components.",
                "Props: Learn to pass data into components to make them reusable.",
                "State: Manage component-level state using the useState hook.",
                "Event Handling: Add interactivity with event listeners in React.",
                "Conditional Rendering: Dynamically show or hide UI elements based on component state.",
                "Component Composition: Build a UI by combining smaller, reusable components"
            ],
            projectSetup: [
                "Get the project files: Download the starter project form the link provided by the trainer.",
                "Set up the environment: Ensure Node.js and npm/yarn are installed. Run npm install (or yarn install) to set up dependencies.",
                "Start the development server: Run npm start (or yarn start) and confirm the starter app run in the browser."
            ],
            tasks: [
                {
                    task: "Create Component",
                    subtasks: [
                        "Make a functional component (e.g., AdviceCard.jsx).",
                        "Add a title, advice text, and a button."
                    ]
                },
                {
                    task: "Props",
                    subtasks: [
                        "Pass advice text as a prop.",
                        "Render it inside the component."
                    ]
                },
                {
                    task: "State & Events",
                    subtasks: [
                        "Use useState for advice text.",
                        "Update state when the button is clicked."
                    ]
                }
            ]
        }
    },
    {
        id: "3",
        title: "React Authentication Lab",
        description: "Implement user authentication using React and JWT tokens",
        type: AssessmentType.PROJECT,
        status: AssessmentStatus.SCHEDULED,
        createdAt: "Sep 23. 2025, 10:30",
        tags: ["React", "JWT", "Authentication"],
        assigned: [
            {
                id: "dfhn-vjdskfsdgfhj6rt",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdsketryugdhcff",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskdfrtyhgf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskdfhjgbcnf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            }
        ]
    },
    {
        id: "4",
        title: "React Component Lab",
        description: "Build a reusable component library with proper TypeScript definitions",
        type: AssessmentType.QUIZ,
        status: AssessmentStatus.ARCHIVED,
        createdAt: "Sep 23. 2025, 10:30",
        tags: ["React", "TypeScript", "Components"],
        assigned: [
            {
                id: "dfhn-vjddhnvmtdrtgfskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdmjhjdyrhfgxskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdsdhdgcfnvbmkf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdshvnmnhcbncbbvfkf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            }
        ],
        questions: [
            {
                question: "Which hook is used to add state in a functional component?",
                options: [
                    "A. useEffect",
                    "B. useState",
                    "C. useContext",
                    "D. useRef"
                ],
                answer: "useState"
            },
            {
                question: "How do you pass data from a parent component to a child component?",
                options: [
                    "A. Using props",
                    "B. Using state",
                    "C. Using setState",
                    "D. Using render"
                ],
                answer: "Using props"
            },
            {
                question: "In React, what happens when a component's state changes?",
                options: [
                    "A. Nothing, the state is private.",
                    "B. The component re-renders with the new state.",
                    "C. The whole page reloads.",
                    "D. The parent component resets."
                ],
                answer: "Nothing, the state is private."
            },
            {
                question: "What is the purpose of export default in a component file?",
                options: [
                    "A. It imports another file.",
                    "B. It allows the component to be used in other files.",
                    "C. It deletes the component.",
                    "D. It styles the component."
                ],
                answer: "It allows the component to be used in other files."
            }
        ]
    }
];

export type MentorAssessment = typeof MentorAssessments[0];