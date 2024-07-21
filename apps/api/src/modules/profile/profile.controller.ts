import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Put,
    Session,
    UseGuards,
} from "@nestjs/common";
import {SessionWithData} from "express-session";

import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";
import {IsAuthenticated} from "@modules/auth";

import * as dtos from "./dtos";

@UseGuards(IsAuthenticated)
@Controller("profile")
export class ProfileController {
    constructor(private readonly prisma: PrismaService) {}

    @Put("me/avatar")
    async editAvatar(
        @Session() session: SessionWithData,
        @Body() dto: dtos.EditAvatarDto,
    ) {
        const user = await this.prisma.user.update({
            where: {
                id: session.userId,
            },
            data: {
                avatarFileId: dto.avatarFileId,
            },
            include: {
                avatarFile: true,
            },
        });

        session.user = user;

        return {
            credentials: sanitized.credentials(user),
        };
    }

    @Get("me/courses")
    async getMyCourses(@Session() session: SessionWithData) {
        const students = await this.prisma.studentProgress.findMany({
            where: {
                userId: session.userId,
            },
            include: {
                course: {
                    include: {
                        previewFile: true,
                    },
                },
            },
        });

        const inProgressCourses = [];
        const completedCourses = [];

        for (let i = 0; i < students.length; i++) {
            const student = students[i];

            const lessons = await this.prisma.lesson.count({
                where: {
                    courseId: student.courseId,
                },
            });

            const isCompleted = student.progress >= lessons;

            const course = {
                ...sanitized.course(student.course),
                progress: student.progress,
                lessons,
            };

            if (isCompleted) completedCourses.push(course);
            else inProgressCourses.push(course);
        }

        const enrollments = (
            await this.prisma.courseEnrollment.findMany({
                where: {
                    userId: session.userId,
                    pack: {
                        not: null,
                    },
                },
                select: {
                    pack: true,
                    courseId: true,
                },
            })
        ).map((e) => ({
            courseId: e.courseId,
            pack: e.pack,
        }));

        const courses = await this.prisma.course.findMany({
            where: {
                OR: [
                    {
                        id: {
                            in: enrollments
                                .map((c) => c.courseId)
                                .filter(Boolean),
                        },
                    },
                    {
                        type: {
                            in: enrollments.map((c) => c.pack).filter(Boolean),
                        },
                    },
                ],
            },
            include: {
                previewFile: true,
            },
        });

        const availableCourses = [];

        for (let i = 0; i < courses.length; i++) {
            const current = courses[i];

            const lessons = await this.prisma.lesson.count({
                where: {
                    courseId: current.id,
                },
            });

            const student = (await this.prisma.studentProgress.findFirst({
                where: {
                    courseId: current.id,
                    userId: session.userId,
                },
            })) || {progress: 0};

            const course = {
                ...sanitized.course(current),
                progress: student.progress,
                lessons,
            };

            availableCourses.push(course);
        }

        return {
            courses: {
                inProgress: inProgressCourses,
                completed: completedCourses,
                available: availableCourses,
            },
        };
    }

    @Get("me/promocode")
    async getMyPromocode(@Session() session: SessionWithData) {
        const promocode = await this.prisma.promocode.findFirst({
            where: {
                userId: session.userId,
            },
        });

        if (!promocode) throw new NotFoundException("Promocode not found");

        return {
            promocode: promocode.code,
        };
    }
}
