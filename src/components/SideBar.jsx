import { useState } from 'react'; // *1
import { useTodo } from '../hooks/useTodo';
import { FaInbox, FaRegCalendar, FaRegCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { Button } from '../components/Common/Button';
import {useDispatch} from 'react-redux'
import {logout} from '../store/slices/authSlice'

export function SideBar() {
    const { selectList } = useTodo(); // *3

    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();

    const handleSelectList = (index) => {
        setSelectedIndex(index);
        selectList(index); // *
    };

    return (
        <aside className='sidebar'>
            <section className='sidebar__generic'>
                <ul className='generic__lists'>
                    <li
                        className={`${selectedIndex === 0 ? 'active' : ''}`}
                        onClick={() => handleSelectList(0)}
                    >
                        <span className='generic__lists--icon'>
                            <FaInbox />
                        </span>
                        <p>Inbox</p>
                    </li>
                    <li
                        className={`${selectedIndex === 1 ? 'active' : ''}`}
                        onClick={() => handleSelectList(1)}
                    >
                        <span className='generic__lists--icon'>
                            <FaRegCalendar />
                        </span>
                        Today
                    </li>
                    <li
                        className={`${selectedIndex === 2 ? 'active' : ''}`}
                        onClick={() => handleSelectList(2)}
                    >
                        <span className='generic__lists--icon'>
                            <FaRegCalendarAlt />
                        </span>
                        Next 7 days
                    </li>
                </ul>
            </section>

            <section className='sidebar__project'>
                <div className='project__head'>
                    <span>
                        <FaChevronDown />
                    </span>
                    <h2>Projects</h2>
                </div>

                <ul className='project__lists'>
                    <li>
                        <span className='project__lists--icon'>
                            <FaInbox />
                        </span>
                        Work
                    </li>
                    <li>
                        <span className='project__lists--icon'>
                            <FaInbox />
                        </span>
                        Home
                    </li>
                </ul>
            </section>

            {/* Pagination */}

            {/* <h1>Appearance</h1>
            <section className='sidebar__pagination'>
                <Button text={'list'} active={true}/>
                <Button text={'page'} active={false}/>

            </section> */}
            <h1>Todo per page</h1>
            <section className='sidebar__pagination'>
                <Button text={5} active={false} />
                <Button text={10} active={false} />
                <Button text={25} active={false} />
                <Button text={'Log out'} active={true} onClick={()=> dispatch(logout())}/>
            </section>
        </aside>
    );
}
