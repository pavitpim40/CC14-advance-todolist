import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './TodoLists.module.scss';
import { TodoItem } from './TodoItem';
import { fetchTodo } from '../../stores/slices/todoSlice';

export function TodoLists() {
    const dispatch = useDispatch();
    const { todosFilter } = useSelector((state) => state.todo);

    useEffect(() => {
        dispatch(fetchTodo());
    }, []);

    return (
        <ul className={styles.todoList}>
            {todosFilter.map((item) => (
                <TodoItem todo={item} key={item.id} />
            ))}
        </ul>
    );
}
