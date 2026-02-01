import React from 'react';
import { CardProps } from '@/types';
import './Card.css';


export const Card: React.FC<CardProps> = ({
    children,
    title,
    subtitle,
    className = '',
    footer,
}) => {
    return (
        <div className={`card ${className}`}>
            {(title || subtitle) && (
                <div className="card__header">
                    {title && <h2 className="card__title">{title}</h2>}
                    {subtitle && <p className="card__subtitle">{subtitle}</p>}
                </div>
            )}

            <div className="card__body">
                {children}
            </div>

            {footer && (
                <div className="card__footer">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
