import styles from './TaskItem.module.css';

const TaskItem = props => {
  return <li className={styles.task}>{props.children}</li>;
};

export default TaskItem;
