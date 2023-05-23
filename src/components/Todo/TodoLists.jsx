import styles from './TodoLists.module.scss';
import { TodoItem } from './TodoItem';
import {useSelector} from 'react-redux'

export function TodoLists() {
    const todosFilter = useSelector(state=>state.todo.todosFilter)

    return (
        <ul className={styles.todoList}>
            {todosFilter.map((item) => (
                <TodoItem todo={item} key={item.id} />
            ))}
        </ul>
    );
}
