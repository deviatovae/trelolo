import { LOCALES } from './locales';
import { Message } from './messages';

export const translations = {
  [LOCALES.ENGLISH]: {
    [Message.WelcomeHeader]: 'Workspace for your team',
    [Message.WelcomeDescription]: 'Create and manage tasks to stay productive',
    [Message.IconKanban]: 'Kanban view',
    [Message.IconDiscuss]: 'Discuss tasks',
    [Message.IconDueDate]: 'Set due date',
    [Message.InvalidEmail]: 'Incorrect e-mail',
    [Message.InvalidUserName]: 'At least two words, each at least 3 characters long',
    [Message.InvalidPassword]: 'Minimum eight characters, at least one letter and one number',
    [Message.InvalidPasswordConfirm]: 'Passwords do not match',
    [Message.SignUpTrelolo]: 'Sign up to Trelolo',
    [Message.LoginTrelolo]: 'Log in to Trelolo',
    [Message.EnterEmail]: 'Enter e-mail',
    [Message.EnterUsername]: 'Enter name, surname',
    [Message.EnterPassword]: 'Enter password',
    [Message.EnterPasswordConfirm]: 'Confirm password',
    [Message.SignUp]: 'Sign Up',
    [Message.Continue]: 'Continue',
    [Message.LogIn]: 'Log in',
    [Message.LogOut]: 'Log out',
    [Message.Account]: 'Account',
    [Message.Or]: 'or',
    [Message.MyTeam]: 'My team',
    [Message.Team]: 'Team',
    [Message.MyProjects]: 'My projects',
    [Message.ManageProjects]: 'Manage projects',
    [Message.ManageProjectsDescription]: 'Create, change the name and delete your projects',
    [Message.TeamProjects]: 'TeamProjects',
    [Message.TeamProjectsDescription]: 'To view the team projects, ask your team member to invite you to their projects. ' +
    'Only the owner of the project can manage a team project.',
    [Message.MyHome]: 'Home',
    [Message.Projects]: 'Projects',
    [Message.Members]: 'Members',
    [Message.AddMember]: 'Add member',
    [Message.InviteMemberHeader]: 'Invite people to my projects',
    [Message.InviteMemberLabelEmail]: 'Add a team member to your project',
    [Message.InviteMemberLabelProjects]: 'Add to projects',
    [Message.EnterMemberEmail]: 'E-mail...',
    [Message.EnterProjects]: 'Select projects',
    [Message.GoodMorning]: 'Good morning',
    [Message.GoodAfternoon]: 'Good afternoon',
    [Message.GoodEvening]: 'Good evening',
    [Message.GoodNight]: 'Good night',
    [Message.CreateNewProject]: 'Create new project',
    [Message.CreateNewProjectShort]: 'New project',
    [Message.EnterProjectName]: 'Write a project name',
    [Message.Create]: 'Create',
    [Message.Update]: 'Update',
    [Message.Delete]: 'Delete',
    [Message.Add]: 'Add',
    [Message.AddColumn]: 'Add column',
    [Message.AddTask]: 'Add task',
    [Message.WriteAColumnName]: 'Write a column name',
    [Message.UpdateMemberHeader]: 'Update member\'s projects',
    [Message.MemberLabelEmail]: 'Member\'s email',
    [Message.MemberLabelProjects]: 'Member\'s projects',
    [Message.MemberAlreadyExist]: 'This member is already on your team',
    [Message.MarkCompleted]: 'Mark completed',
    [Message.DeleteTask]: 'Delete task',
    [Message.WriteATaskTitle]: 'Write a task title',
    [Message.Assignee]: 'Assignee',
    [Message.DueDate]: 'Due date',
    [Message.Status]: 'Status',
    [Message.Description]: 'Description',
    [Message.WhatIsThisTaskAbout]: 'What is this task about',
    [Message.WriteAComment]: 'Write a comment...',
    [Message.Comment]: 'Comment',
    [Message.NoDueDate]: 'No due date',
    [Message.Tasks]: 'Tasks',
    [Message.AllTasks]: 'All tasks',
    [Message.AssignedToMe]: 'Assigned to me',
    [Message.EnterName]: 'Enter a name',
    [Message.MyProfile]: 'My profile',
    [Message.ProfileSettings]: 'Profile settings',
    [Message.YourFullName]: 'Your full name',
    [Message.PickColor]: 'Pick color',
    [Message.EmailAddress]: 'Email address',
    [Message.ChangePassword]: 'Change password',
    [Message.EnterCurrentPassword]: 'Enter current password',
    [Message.EnterNewPassword]: 'Enter new password',
    [Message.SaveChanges]: 'Save',
    [Message.Edited]: 'Edited',
    [Message.NoComments]: 'No comments',
    [Message.Today]: 'Today',
    [Message.AreYouSure]: 'Are you sure',
    [Message.NoTasks]: 'No tasks. ',
    [Message.TaskName]: 'Task name',
    [Message.Project]: 'Project',
    [Message.VisitProjects]: 'Visit projects page',
  },
  [LOCALES.RUSSIAN]: {
    [Message.WelcomeHeader]: 'Рабочее пространство для вашей команды',
    [Message.WelcomeDescription]: 'Работай продуктивно, создавая и управляя задачами',
    [Message.IconKanban]: 'Канбан вид',
    [Message.IconDiscuss]: 'Обсуждай задачи',
    [Message.IconDueDate]: 'Устанавливай дедлайн',
    [Message.InvalidEmail]: 'Неверный e-mail',
    [Message.InvalidUserName]: 'Минимум два слова, каждое не менее 3 букв',
    [Message.InvalidPassword]: 'Минимум 8 символов и содержит одну букву и одну цифру',
    [Message.InvalidPasswordConfirm]: 'Пароли не совпадают',
    [Message.SignUpTrelolo]: 'Регистрация в Trelolo',
    [Message.LoginTrelolo]: 'Войти в Trelolo',
    [Message.EnterEmail]: 'Введите e-mail',
    [Message.EnterUsername]: 'Введите имя, фамилию',
    [Message.EnterPassword]: 'Введите пароль',
    [Message.EnterPasswordConfirm]: 'Подтвердите пароль',
    [Message.SignUp]: 'Зарегистрироваться',
    [Message.Continue]: 'Продолжить',
    [Message.LogIn]: 'Войти',
    [Message.LogOut]: 'Выйти',
    [Message.Account]: 'Аккаунт',
    [Message.Or]: 'или',
    [Message.MyTeam]: 'Моя команда',
    [Message.Team]: 'Команда',
    [Message.MyProjects]: 'Мои проекты',
    [Message.ManageProjects]: 'Редактирование проектов',
    [Message.ManageProjectsDescription]: 'Создавай, меняй имя и удаляй свои проекты',
    [Message.TeamProjects]: 'Проекты моей команды',
    [Message.TeamProjectsDescription]: 'Чтобы увидеть командные проекты, попросите участника команды пригласить вас в проект. ' +
    'Только владелец проекта может управлять проектами.',
    [Message.MyHome]: 'Главная',
    [Message.Projects]: 'Проекты',
    [Message.Members]: 'Участники',
    [Message.AddMember]: 'Добавить',
    [Message.InviteMemberHeader]: 'Пригласить участников в мои проекты',
    [Message.InviteMemberLabelEmail]: 'Укажите e-mail участника',
    [Message.InviteMemberLabelProjects]: 'Укажите проекты',
    [Message.EnterMemberEmail]: 'E-mail...',
    [Message.EnterProjects]: 'Проекты...',
    [Message.GoodMorning]: 'Доброе утро',
    [Message.GoodAfternoon]: 'Добрый день',
    [Message.GoodEvening]: 'Добрый вечер',
    [Message.GoodNight]: 'Доброй ночи',
    [Message.CreateNewProject]: 'Создать новый проект',
    [Message.CreateNewProjectShort]: 'Новый проект',
    [Message.EnterProjectName]: 'Введите имя проекта',
    [Message.Create]: 'Создать',
    [Message.Update]: 'Обновить',
    [Message.Delete]: 'Удалить',
    [Message.Add]: 'Добавить',
    [Message.AddColumn]: 'Добавить колонку',
    [Message.AddTask]: 'Добавить задачу',
    [Message.WriteAColumnName]: 'Укажите название колонки',
    [Message.UpdateMemberHeader]: 'Обновить проекты участника',
    [Message.MemberLabelEmail]: 'E-mail участника',
    [Message.MemberLabelProjects]: 'Проекты участника',
    [Message.MemberAlreadyExist]: 'Этот участник уже в вашей команде',
    [Message.MarkCompleted]: 'Задача сделана',
    [Message.DeleteTask]: 'Удалить задачу',
    [Message.WriteATaskTitle]: 'Укажите название задачи',
    [Message.Assignee]: 'Ответственный',
    [Message.DueDate]: 'Дедлайн',
    [Message.Status]: 'Статус',
    [Message.Description]: 'Описание',
    [Message.WhatIsThisTaskAbout]: 'О чем эта задача?',
    [Message.WriteAComment]: 'Напишите комментарий...',
    [Message.Comment]: 'Комментировать',
    [Message.NoDueDate]: 'Нет дедлайна',
    [Message.Tasks]: 'Задачи',
    [Message.AllTasks]: 'Все задачи',
    [Message.AssignedToMe]: 'Мои задачи',
    [Message.EnterName]: 'Введите название',
    [Message.MyProfile]: 'Мой профиль',
    [Message.ProfileSettings]: 'Настройки профиля',
    [Message.YourFullName]: 'Ваше полное имя',
    [Message.PickColor]: 'Выберите цвет',
    [Message.EmailAddress]: 'Email адрес',
    [Message.ChangePassword]: 'Изменить пароль',
    [Message.EnterCurrentPassword]: 'Введите текущий пароль',
    [Message.EnterNewPassword]: 'Введите новый пароль',
    [Message.SaveChanges]: 'Сохранить',
    [Message.Edited]: 'Отредактировано',
    [Message.NoComments]: 'Пока нет комментариев',
    [Message.Today]: 'Cегодня',
    [Message.AreYouSure]: 'Вы уверены',
    [Message.NoTasks]: 'Нет задач. ',
    [Message.TaskName]: 'Название задачи',
    [Message.Project]: 'Проект',
    [Message.VisitProjects]: 'Посетите страницу проектов',
  },
};
