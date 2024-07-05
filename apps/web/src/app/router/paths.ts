export const ROUTER_PATHS = {
	HOME: "/",
	FREELANCE_TEENS_COURSES: "/courses/freelance-teens",
	EDUCATION_COURSES: "/courses/education",
	LANGUAGE_COURSES: "/courses/language",
	EXPERTS: "/experts",
	ALUMNI: "/alumni",
	VACANCIES: "/vacancies",
	ALUMNUS: {
		template: "/alumni/:alumnusId",
		filled: (id: string) => `/alumni/${id}`,
	},
	EXPERT: {
		template: "/experts/:expertId",
		filled: (id: string) => `/experts/${id}`,
	},
	COURSE: {
		template: "/courses/:courseId",
		filled: (id: string) => `/courses/${id}`,
	},
	LESSON: {
		template: "/courses/:courseId/lessons/:lessonId",
		filled: (courseId: string, lessonId: string) =>
			`/courses/${courseId}/lessons/${lessonId}`,
	},
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	PROFILE: "/profile",
	COURSE_CERTIFICATE: {
		template: "/courses/:courseId/certificate",
		filled: (id: string) => `/courses/${id}/certificate`,
	},
	INTERNAL: {
		ADMIN: {
			USERS: "/admin/users",
			USER: {
				template: "/admin/users/:userId",
				filled: (id: string) => `/admin/users/${id}`,
			},
			CONSULTATION_REQUESTS: "/admin/consultations",
			COURSES: "/admin/courses",
			COURSE: {
				template: "/admin/courses/:id",
				filled: (id: string) => `/admin/courses/${id}`,
			},
			CREATE_COURSE: "/admin/courses/create",
			EXPERTS: "/admin/experts",
			EXPERT: {
				template: "/admin/experts/:id",
				filled: (id: string) => `/admin/experts/${id}`,
			},
			CREATE_EXPERT: "/admin/experts/create",
			ALUMNI: "/admin/alumni",
			ALUMNUS: {
				template: "/admin/alumni/:id",
				filled: (id: string) => `/admin/alumni/${id}`,
			},
			CREATE_ALUMNUS: "/admin/alumni/create",
			VACANCIES: "/admin/vacancies",
			VACANCY: {
				template: "/admin/vacancies/:id",
				filled: (id: string) => `/admin/vacancies/${id}`,
			},
			CREATE_VACANCY: "/admin/vacancies/create",
			REVIEWS: "/admin/reviews",
		},
		EXPERT: {
			COURSES: "/expert/courses",
			COURSE: {
				template: "/expert/courses/:courseId",
				filled: (id: string) => `/expert/courses/${id}`,
			},
			HOMEWORK_ANSWER: {
				template: "/expert/courses/:courseId/answers/:answerId",
				filled: (courseId: string, answerId: string) =>
					`/expert/courses/${courseId}/answers/${answerId}`,
			},
		},
	},
};
