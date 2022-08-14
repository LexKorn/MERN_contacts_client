import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
// import { Loader } from '../components/Loader';
// import { InputFields } from '../components/InputFields';

import { BACK_URL } from '../config/default';

export function EditPage() {
	const {request} = useHttp();
    const {token} = useContext(AuthContext);
	const { id } = useParams();
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');

    const navigate = useNavigate();

	useEffect(() => {
        window.M.updateTextFields();
    }, []);

	useEffect(() => {
		request(`${BACK_URL}/post-update/${id}`, 'GET', null, {
			Authorization: `Bearer ${token}`
		})
			.then((data) => {
				setName(data.name);
				setPhone(data.phone);
			})
			.catch((err) => console.error(err));
	}, [id, token, request]);

	const editContactHandler = async () => {
		try {
			const response = await request(`${BACK_URL}/post-update`, 'PUT', {name, phone, contactId: id}, {
				Authorization: `Bearer ${token}`
			})

			// if (response.status !== 200) {
			// 	return console.error(response);
			// }

			// console.log(response);
            navigate('/');

		} catch (err) {
			console.error(err);
		}
	};

	console.log(id);
	return (
		<div>
			{/* <Loader open={loading} /> */}
			{/* <InputFields title={title} setTitle={setTitle} text={text} setText={setText} titlePage='Редактирование поста' />
			<button onClick={editContactHandler} style={{ margin: '20px 0' }} variant='contained' color='primary'>
				Изменить
			</button> */}
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <h1>Редактирование контакта</h1>
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
                    <button className="blue darken-1 btn" onClick={editContactHandler}>Изменить</button> 
                </div>                           
            </div>   
		</div>
	);
}