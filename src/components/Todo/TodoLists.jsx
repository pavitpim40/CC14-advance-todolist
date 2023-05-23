import styles from './TodoLists.module.scss';

import { TodoItem } from './TodoItem';

export function TodoLists() {


    return (
        <ul className={styles.todoList}>
            {[].map((item) => (
                <TodoItem todo={item} key={item.id} />
            ))}
        </ul>
    );
}
