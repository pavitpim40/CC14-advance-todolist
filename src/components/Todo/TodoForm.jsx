import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { createTodo } from '../../store/slices/todoSlice';
import PropTypes from 'prop-types';
import styles from './TodoForm.module.scss';

TodoForm.propTypes = {
    textConfirm: PropTypes.string.isRequired,
    onSetShow: PropTypes.func.isRequired,
    oldTodo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
        task: PropTypes.string.isRequired,
        status: PropTypes.bool.isRequired,
        date: PropTypes.string.isRequired,
    }),
};

export function TodoForm({ textConfirm, onSetShow, oldTodo }) {
    // Consumer : TodoContext
    // const { addTodo, editTodo } = useTodo(); //#3 consume
    // State
    const [task, setTask] = useState(oldTodo?.task || '');
    const [error, setError] = useState(false);
    const [date, setDate] = useState(null);
    const dispatch = useDispatch()

    // Other function
    const validate = (text) => {
        if (text.trim() === '') {
            setError(true);
            return false;
        } else {
            setError(false);
            return true;
        }
    };

    // Event Handler
    const handleChangeInput = (e) => {
        setError(false);
        setTask(e.target.value);
    };

    const handleChangeDate = (e) => {
        console.log(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validTask = validate(task);
        if (validTask && !oldTodo) {
            // onAddTodo?.(task);
            // addTodo?.(task);
            dispatch(createTodo({task}))
            onSetShow(false);
        } else if (validTask && oldTodo) {
            // console.log(oldTodo.id)
            // editTodo(oldTodo.id, { ...oldTodo, task });
            onSetShow(false);
        }
    };

    const handleCancel = () => {
        onSetShow(false);
        // can setState('')
    };
    // UI
    return (
        <form className={styles.todo__form__container} onSubmit={handleSubmit}>
            <input
                className={styles.todo__form__input}
                placeholder='Task Name'
                value={task}
                onChange={handleChangeInput}
            />
            <div className={styles.todo__form__date}>
                <input type='date' onChange={handleChangeDate} />
            </div>
            <div className={styles.todo__form__footer}>
                {error && <p className={styles.todo__error}>Task Name is required</p>}
                <div className={styles.todo__form__buttons}>
                    <button type='button' onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type='submit'>{textConfirm}</button>
                </div>
            </div>
        </form>
    );
}
