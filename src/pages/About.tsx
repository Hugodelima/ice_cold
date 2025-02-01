import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function About() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });


    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = 'O nome é obrigatório.';
        if (!formData.email) tempErrors.email = 'O email é obrigatório.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email inválido.';
        if (!formData.message) tempErrors.message = 'A mensagem não pode estar vazia.';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert('Formulário enviado com sucesso!');
            setFormData({ name: '', email: '', message: '' }); 
        }
    };

    return (
        <div>
            <Navbar />

            <div className="container my-5">
                <h1>Sobre Nós</h1>
                <p>Bem-vindo à nossa sorveteria! Aqui, criamos sorvetes artesanais com ingredientes frescos e de alta qualidade. Cada sabor é uma explosão de criatividade e dedicação, oferecendo aos nossos clientes uma experiência única de sabor.</p>
                <p>Nosso objetivo é proporcionar momentos deliciosos, oferecendo opções para todos os gostos, com uma variedade de sabores e opções veganas e sem lactose. Venha se deliciar com as nossas criações!</p>

                <h3>Entre em Contato</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Mensagem</label>
                        <textarea
                            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
                
            </div>

            <div className='d-flex align-items-center flex-column'>
                <h3>Nossa Localização</h3>
                <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7580997.396369731!2d-55.89731968200877!3d-21.90920762704393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20maps%20iframe!5e0!3m2!1spt-BR!2sbr!4v1732236455249!5m2!1spt-BR!2sbr" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Horários de Funcionamento</h3>
                <table className="table w-50">
                    <thead>
                        <tr>
                            <th scope="col">Segunda-Feira</th>
                            <th scope="col">Terça-Feira</th>
                            <th scope="col">Quarta-Feira</th>
                            <th scope="col">Quinta-Feira</th>
                            <th scope="col">Sexta-Feira</th>
                            <th scope="col">Sábado</th>
                            <th scope="col">Domingo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>07:00 Até 18:00</td>
                            <td>07:00 Até 18:00</td>
                            <td>07:00 Até 18:00</td>
                            <td>07:00 Até 18:00</td>
                            <td>07:00 Até 18:00</td>
                            <td className='text-danger'>Não Atendemos</td>
                            <td className='text-danger'>Não Atendemos</td>
                        </tr>
                    </tbody>
                </table>
                                    
                
            </div>
        </div>
    );
}

export default About;

