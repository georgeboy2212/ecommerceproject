import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
            
            // La respuesta ahora contiene 'token' y 'roles'
            const { token, roles } = response.data;

            localStorage.setItem('token', token);

            // Lógica de redirección basada en roles
            if (roles.includes('ROLE_ADMIN')) {
                // Si el usuario es ADMIN, redirigir al panel de administración
                window.location = '/admin';
            } else {
                // Si es un usuario normal, redirigir a la lista de productos
                window.location = '/';
            }

        } catch (err) {
            console.error("Error en el login:", err.response || err);
            setError('Credenciales inválidas o error en el servidor');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} class="uk-card  uk-card-default uk-card-body uk-padding">
                <h2>Inicia Sesión</h2>
                <input class="uk-input uk-margin" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
                <input class="uk-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                <div class="uk-margin">
                <button class="uk-button uk-button-secondary" type="submit">Ingresar</button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;