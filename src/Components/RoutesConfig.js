import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import PlayLessonOutlinedIcon from '@mui/icons-material/PlayLessonOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';

export const routesConfig = {
  ADMIN: [
    {
      code: "dashboard",
      title: "Dashboard",
      icon: <HomeOutlinedIcon />,
      route: "/principalDashboard/dashboard",
    },
    {
      code: "masterRoutine",
      title: "Master Routine",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/principalDashboard/masterRoutine",
    },
    {
      code: "lessonPlan",
      title: "Lesson Plan",
      icon: <PlayLessonOutlinedIcon />,
      route: "/principalDashboard/lessonPlan",
    },
    {
      code: "attendanceOverview",
      title: "Attendance",
      icon: <BookOutlinedIcon />,
      route: "/principalDashboard/attendanceOverview",
    },
    {
      code: "reports",
      title: "Report",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/principalDashboard/reports",
    },
    {
      code: "resources",
      title: "Resources",
      icon: <SourceOutlinedIcon />,
      route: "/principalDashboard/resources",
    },
    // {
    //   code: "announcements",
    //   title: "Notice",
    //   icon: <ArticleOutlinedIcon />,
    //   route: "/principalDashboard/announcements",
    // },
    // {
    //   code: "notifications",
    //   title: "Notifications",
    //   icon: <NotificationsOutlinedIcon />,
    //   route: "/principalDashboard/notifications",
    // },
  ],
  PRINCIPAL: [
    {
      code: "dashboard",
      title: "Dashboard",
      icon: <HomeOutlinedIcon />,
      route: "/principalDashboard/dashboard",
    },
    {
      code: "masterRoutine",
      title: "Master Routine",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/principalDashboard/masterRoutine",
    },
    {
      code: "lessonPlan",
      title: "Lesson Plan",
      icon: <PlayLessonOutlinedIcon />,
      route: "/principalDashboard/lessonPlan",
    },
    {
      code: "attendanceOverview",
      title: "Attendance",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/principalDashboard/attendanceOverview",
    },
    {
      code: "reports",
      title: "Report",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/principalDashboard/reports",
    },
    {
      code: "resources",
      title: "Resources",
      icon: <SourceOutlinedIcon />,
      route: "/principalDashboard/resources",
    },
    // {
    //   code: "announcements",
    //   title: "Notice",
    //   icon: <ArticleOutlinedIcon />,
    //   route: "/principalDashboard/announcements",
    // },
    // {
    //   code: "notifications",
    //   title: "Notifications",
    //   icon: <NotificationsOutlinedIcon />,
    //   route: "/principalDashboard/notifications",
    // },
  ],
  TEACHER: [
    {
      code: "dashboard",
      title: "Dashboard",
      icon: <HomeOutlinedIcon />,
      route: "/teacherDashboard/dashboard",
    },
    {
      code: "subjects",
      title: "My Subjects",
      icon: <SubjectOutlinedIcon />,
      route: "/teacherDashboard/subjects",
    },
    {
      code: "lessonPlan",
      title: "Lesson Plan",
      icon: <PlayLessonOutlinedIcon />,
      route: "/teacherDashboard/lessonPlan",
    },
    {
      code: "logBook",
      title: "Log Book",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/teacherDashboard/logBook",
    },
    {
      code: "attendance",
      title: "Attendance",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/teacherDashboard/attendance",
    },
    {
      code: "assignments",
      title: "Assignments",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/teacherDashboard/assignments",
    },
    {
      code: "resources",
      title: "Resources",
      icon: <SourceOutlinedIcon />,
      route: "/teacherDashboard/resources",
    },
    {
      code: "reports",
      title: "Report",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/teacherDashboard/reports",
    },
    // {
    //   code: "announcements",
    //   title: "Notice",
    //   icon: <ArticleOutlinedIcon />,
    //   route: "/teacherDashboard/announcements",
    // },
    // {
    //   code: "notifications",
    //   title: "Notifications",
    //   icon: <NotificationsOutlinedIcon />,
    //   route: "/teacherDashboard/notifications",
    // },
  ],
  STUDENT: [
    {
      code: "dashboard",
      title: "Dashboard",
      icon: <HomeOutlinedIcon />,
      route: "/studentDashboard/dashboard",
    },
    {
      code: "assignments",
      title: "Assignments",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/studentDashboard/assignments",
    },
    {
      code: "resources",
      title: "Resources",
      icon: <SourceOutlinedIcon />,
      route: "/studentDashboard/resources",
    },
    {
      code: "reports",
      title: "Report",
      icon: <AssignmentIndOutlinedIcon />,
      route: "/studentDashboard/reports",
    },
    // {
    //   code: "announcements",
    //   title: "Notice",
    //   icon: <ArticleOutlinedIcon />,
    //   route: "/studentDashboard/announcements",
    // },
    // {
    //   code: "notifications",
    //   title: "Notifications",
    //   icon: <NotificationsOutlinedIcon />,
    //   route: "/studentDashboard/notifications",
    // },
  ],
};
