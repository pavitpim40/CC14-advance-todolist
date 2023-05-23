import React, {useEffect} from 'react';
import { Header } from '../components/Header';
import { SideBar } from '../components/SideBar';
import { TodoContent } from '../components/Todo/TodoContent';

import {useDispatch} from 'react-redux'
import { fetchAllTodo } from '../store/slices/todoSlice';

function TodoPage() {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAllTodo())
    },[])
    return (
            <div className='container'>
                <Header />
                <SideBar />
                <TodoContent />
            </div>
    );
}

export default TodoPage;
