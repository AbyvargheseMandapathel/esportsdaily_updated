import { useState } from 'react';
import LoginForm from './LoginForm';
import LoginVisuals from './LoginVisuals';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            // Handle login logic here
            console.log('Form submitted:', formData);
        }
    };

    return (
        <section className="min-h-screen flex flex-col md:flex-row">
            <LoginForm 
                formData={formData} 
                errors={errors} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
            />
            <LoginVisuals />
        </section>
    );
}

export default LoginPage;