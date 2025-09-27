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
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
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
        id: "2",
        title: "React Component Lab",
        description: "Build a reusable component library with proper TypeScript definitions",
        type: AssessmentType.CODE_LAB,
        status: AssessmentStatus.ACTIVE,
        createdAt: "Sep 23. 2025, 10:30",
        tags: ["React", "TypeScript", "Components"],
        assigned: [
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
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
        id: "3",
        title: "React Authentication Lab",
        description: "Implement user authentication using React and JWT tokens",
        type: AssessmentType.PROJECT,
        status: AssessmentStatus.SCHEDULED,
        createdAt: "Sep 23. 2025, 10:30",
        tags: ["React", "JWT", "Authentication"],
        assigned: [
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
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
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            },
            {
                id: "dfhn-vjdskf",
                email: "johndoe@gmail.com",
                username: "john_doe",
                role: Roles.LEARNER,
                firstName: "John",
                lastName: "Doe",
                profilePictureUrl: user
            }
        ]
    }
];

export type MentorAssessment = typeof MentorAssessments[0];