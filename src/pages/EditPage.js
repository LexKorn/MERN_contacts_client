import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { Loader } from '../components/Loader';
// import { InputFields } from '../components/InputFields';

import { BACK_URL } from '../config/default';

export function EditPage() {
	const { id } = useParams();
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');

    const navigate = useNavigate();

	useEffect(() => {
        window.M.updateTextFields();
    }, []);

	useEffect(() => {
		fetch(`${BACK_URL}/post-update/${id}`)
			.then((json) => json.json())
			.then((data) => {
				console.log(data);
				setName(data.name);
				setPhone(data.phone);
			})
			.catch((err) => console.error(err))
	}, [id]);

	const editContactHandler = async () => {
		try {
			const response = await fetch(`${BACK_URL}/post-update`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ name, phone, contactId: id }),
			});

			const data = await response.json();

			if (response.status !== 200) {
				return console.error(data);
			}

			console.log(data);
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