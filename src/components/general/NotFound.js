import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div>
            <p style={{ fontSize: '40px', marginTop: '100px' }}>{t('404')}</p>
        </div>
    );
};

export default NotFound;
