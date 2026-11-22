// TasksPanel - the tasks of the selected member, with messages for the empty states.
import styles from './TasksPanel.module.css'

/**
 * @param {object} props
 * @param {{id: number, name: string, role: string, isActive: boolean} | null} props.member - the selected member, or null
 * @param {Array<{id: number, title: string, done: boolean, assignedTo: number}>} props.tasks - the tasks of the selected member
 * @param {(taskId: number) => void} props.onToggleTask - call it with task.id when a task checkbox is clicked
 */
export default function TasksPanel({ member, tasks, onToggleTask }) {
  // TODO: no member selected -> "Select a member to see their tasks"
  // TODO: the member has no tasks -> "No tasks yet"
  // TODO: otherwise, a loop over tasks: a checkbox (checked = done) + the title, inside a <label>
// 1. No member selected
   // No member selected
  if (!member) {
    return (
      <div className={styles.tasksPanel}>
        <p className={styles.empty}>
          Select a member to see their tasks
        </p>
      </div>
    );
  }

  // No tasks
  if (tasks.length === 0) {
    return (
      <div className={styles.tasksPanel}>
        <p className={styles.empty}>No tasks yet</p>
      </div>
    );
  }

  // Count completed tasks
  const doneCount = tasks.filter(task => task.done).length;

  return (
    <div className={styles.tasksPanel}>

      <h3 className={styles.title}>
        Tasks of {member.name}
      </h3>

      <p className={styles.counter}>
        {doneCount}/{tasks.length} done
      </p>

      <div className={styles.tasks}>
        {tasks.map(task => (
          <label
            key={task.id}
            className={styles.task}
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggleTask(task.id)}
            />

            <span className={task.done ? styles.done : ''}>
              {task.title}
            </span>
          </label>
        ))}
      </div>

    </div>
  );
}