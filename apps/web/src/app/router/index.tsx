import {Route, Switch} from "wouter";

import {HomePage} from "@pages/home";
import {FreelanceTeensCoursesPage} from "@pages/courses/freelance-teens";
import {EducationCoursesPage} from "@pages/courses/education";
import {LanguageCoursesPage} from "@pages/courses/language";
import {ExpertsPage} from "@pages/experts";
import {VacanciesPage} from "@pages/vacancies";
import {AlumniPage} from "@pages/alumni";
import {AlumnusPage} from "@pages/alumni/alumnus";
import {ExpertPage} from "@pages/experts/expert";
import {ProfilePage} from "@pages/profile";
import {SignInPage} from "@pages/auth/sign-in";
import {SignUpPage} from "@pages/auth/sign-up";
import {InternalAdminUsersPage} from "@pages/internal/admin/users";
import {InternalAdminConsultationRequestsPage} from "@pages/internal/admin/consultation-requests";
import {InternalAdminAlumnusPage} from "@pages/internal/admin/alumni/alumnus";
import {InternalAdminCreateAlumnusPage} from "@pages/internal/admin/alumni/create";
import {InternalAdminCreateExpertPage} from "@pages/internal/admin/experts/create";
import {InternalAdminExpertPage} from "@pages/internal/admin/experts/expert";
import {InternalAdminExpertsPage} from "@pages/internal/admin/experts";
import {InternalAdminCoursesPage} from "@pages/internal/admin/courses";
import {InternalAdminAlumniPage} from "@pages/internal/admin/alumni";
import {InternalAdminVacanciesPage} from "@pages/internal/admin/vacancies";
import {InternalAdminCreateVacancyPage} from "@pages/internal/admin/vacancies/create";
import {InternalAdminVacancyPage} from "@pages/internal/admin/vacancies/vacancy";
import {InternalAdminCreateCoursePage} from "@pages/internal/admin/courses/create";
import {InternalAdminCoursePage} from "@pages/internal/admin/courses/course";
import {InternalAdminReviewsPage} from "@pages/internal/admin/reviews";
import {CoursePage} from "@pages/courses/course";
import {InternalAdminUserPage} from "@pages/internal/admin/users/user";
import {LessonPage} from "@pages/lesson";
import {InternalExpertCoursesPage} from "@pages/internal/expert/courses";
import {InternalExpertCoursePage} from "@pages/internal/expert/course";
import {InternalExpertPendingHomeworkAnswerPage} from "@pages/internal/expert/homework-answer";
import {CertificatePage} from "@pages/certificate";
import {InternalAdminHomePage} from "@pages/internal/admin";
import {InternalAdminCreateUserPage} from "@pages/internal/admin/users/create";

import {
    AuthenticatedRoute,
    InternalAdminRoute,
    InternalExpertRoute,
    PrivateRoute,
    PublicOnlyRoute,
    PublicRoute,
} from "./route";
import {ROUTER_PATHS} from "./paths";
import {PrivateHomePage} from "@pages/home/private";
import {ExpertHomePage} from "@pages/home/expert";

export const Router: React.FC = () => {
    return (
        <Switch>
            <Route path={ROUTER_PATHS.HOME} component={HomePage} />
            <AuthenticatedRoute
                path={ROUTER_PATHS.PROFILE}
                component={ProfilePage}
            />
            <PrivateRoute
                path={ROUTER_PATHS.MY_COURSES}
                component={PrivateHomePage}
            />
            <InternalExpertRoute
                path={ROUTER_PATHS.INTERNAL.EXPERT.HOME}
                component={ExpertHomePage}
            />
            <PublicRoute
                path={ROUTER_PATHS.FREELANCE_TEENS_COURSES}
                component={FreelanceTeensCoursesPage}
            />
            <PublicRoute
                path={ROUTER_PATHS.EDUCATION_COURSES}
                component={EducationCoursesPage}
            />
            <PublicRoute
                path={ROUTER_PATHS.LANGUAGE_COURSES}
                component={LanguageCoursesPage}
            />
            <PublicRoute
                path={ROUTER_PATHS.COURSE.template}
                component={CoursePage}
            />
            <PrivateRoute
                path={ROUTER_PATHS.LESSON.template}
                component={LessonPage}
            />
            <PublicRoute path={ROUTER_PATHS.EXPERTS} component={ExpertsPage} />
            <PublicRoute
                path={ROUTER_PATHS.EXPERT.template}
                component={ExpertPage}
            />
            <PublicRoute path={ROUTER_PATHS.ALUMNI} component={AlumniPage} />
            <PublicRoute
                path={ROUTER_PATHS.VACANCIES}
                component={VacanciesPage}
            />
            <PublicRoute
                path={ROUTER_PATHS.ALUMNUS.template}
                component={AlumnusPage}
            />
            <PrivateRoute
                path={ROUTER_PATHS.COURSE_CERTIFICATE.template}
                component={CertificatePage}
            />

            <PublicOnlyRoute
                path={ROUTER_PATHS.SIGN_IN}
                component={SignInPage}
            />
            <PublicOnlyRoute
                path={ROUTER_PATHS.SIGN_UP}
                component={SignUpPage}
            />

            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.HOME}
                component={InternalAdminHomePage}
            />

            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.USERS}
                component={InternalAdminUsersPage}
            />

            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.CREATE_USER}
                component={InternalAdminCreateUserPage}
            />

            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.USER.template}
                component={InternalAdminUserPage}
            />

            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.CONSULTATION_REQUESTS}
                component={InternalAdminConsultationRequestsPage}
            />
            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.COURSES}
                component={InternalAdminCoursesPage}
            />
            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.CREATE_COURSE}
                component={InternalAdminCreateCoursePage}
            />
            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.COURSE.template}
                component={InternalAdminCoursePage}
            />

            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.EXPERTS}
                component={InternalAdminExpertsPage}
            />
            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.CREATE_EXPERT}
                component={InternalAdminCreateExpertPage}
            />
            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.EXPERT.template}
                component={InternalAdminExpertPage}
            />

            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.ALUMNI}
                component={InternalAdminAlumniPage}
            />
            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.CREATE_ALUMNUS}
                component={InternalAdminCreateAlumnusPage}
            />
            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.ALUMNUS.template}
                component={InternalAdminAlumnusPage}
            />

            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.VACANCIES}
                component={InternalAdminVacanciesPage}
            />
            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.CREATE_VACANCY}
                component={InternalAdminCreateVacancyPage}
            />
            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.VACANCY.template}
                component={InternalAdminVacancyPage}
            />

            <InternalAdminRoute
                path={ROUTER_PATHS.INTERNAL.ADMIN.REVIEWS}
                component={InternalAdminReviewsPage}
            />

            <InternalExpertRoute
                path={ROUTER_PATHS.INTERNAL.EXPERT.COURSES}
                component={InternalExpertCoursesPage}
            />
            <InternalExpertRoute
                path={ROUTER_PATHS.INTERNAL.EXPERT.COURSE.template}
                component={InternalExpertCoursePage}
            />
            <InternalExpertRoute
                path={ROUTER_PATHS.INTERNAL.EXPERT.HOMEWORK_ANSWER.template}
                component={InternalExpertPendingHomeworkAnswerPage}
            />
        </Switch>
    );
};
