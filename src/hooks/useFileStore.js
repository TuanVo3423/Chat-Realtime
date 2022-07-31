import React, { useState } from 'react';
import { db } from '../firebase/config';
import PropTypes from 'prop-types';

const useFirestore = (collection, condition) => {
    const [documents, setDocuments] = useState([]);

    React.useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createdAt');
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                // reset documents data
                setDocuments([]);
                return;
            } else {
                collectionRef = collectionRef.where(condition.fieldName, condition.operators, condition.compareValue);
            }
        } else {
            setDocuments([]);
            return;
        }

        const unsubscribe = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setDocuments(documents);
        });

        return unsubscribe;
    }, [collection, condition]);

    return documents;
};
useFirestore.propTypes = {
    collection: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
};

export default useFirestore;
