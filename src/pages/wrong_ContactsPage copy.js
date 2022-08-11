import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { BACK_URL } from '../config/default';


export const ContactsPage = () => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const createContactHandler = async event => {
        try {
            const data = await request(`${BACK_URL}/api/contacts/post`, 'POST', {
                Authorization: `Bearer ${auth.token}`
            });
            console.log(data);
            // navigate(`/detail/${data.link._id}`);
            navigate(`${BACK_URL}/api/contacts`);
        } catch(err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <h1>Создай контакт</h1>
            <div className='row'>
                <div className='col s8 offset-s2' style={{paddingTop: '2rem'}}>
                    <div className="input-field">
                        <input 
                            placeholder="Имя" 
                            id="name" 
                            type="text" 
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <label htmlFor='link'>Введите имя</label>
                    </div>
                    <div className="input-field">
                        <input 
                            placeholder="Телефон" 
                            id="phone" 
                            type="text" 
                            value={phone}
                            onChange={e => setPhone(e.target.value)} />
                        <label htmlFor='link'>Введите телефон</label>
                    </div>
                    <button class="blue darken-1 btn" onClick={createContactHandler}>Создать</button> 
                </div>                           
            </div>            
        </div>
    );
};