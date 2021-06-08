import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Column } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import Books from '../Books';

const useStyles = createUseStyles((theme) => ({
    title: {
        ...theme.typography.title,
        '@media (max-width: 1080px)': {
            marginLeft: 50,
        },
        '@media (max-width: 468px)': {
            fontSize: 20,
        },
        color: theme.color.veryDarkGrayishBlue,
        marginBottom: 50
    },
    formControl: {
        margin: 20,
    },
    selectEmpty: {
        marginTop: 20,
    },
    selectCategory: {
        minWidth: 300
    },
    description: {
        backgroundColor: '#ECECE5',
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.9
    },
    button: {
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 15,
        width: window.innerHeight * 0.16,
        height: window.innerHeight * 0.05
    }
}));

const selectStyles = {
    control: styles => ({ ...styles, backgroundColor: '#ECECE5' }),
};

export default function EditBooks() {

    const theme = useTheme();
    const classes = useStyles({ theme });
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [categories, setCategory] = useState([]);
    const [description, setDescription] = useState('');
    const location = useLocation();
    const book = location.book;
    const animatedComponents = makeAnimated();

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeAuthors = (event) => {
        setAuthors(event.target.value);
    };

    const handleChangeCategories = (event) => {
        setCategory(categories => categories.concat(event.target.value));
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    useEffect(() => {
        if (book) {
            console.log('BOOK', book);
            setTitle(book.title);
            console.log('CATE BEFORE', categories);
            setCategory(book.categories);
            setAuthors(book.authors);
            setDescription(book.description);
        }
    }, [location])

    console.log('CATE AFTER', categories);

    return (
        <Column>
            <span className={classes.title}>Edit Harry Potter</span>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={title}
                        onChange={handleChangeTitle}
                        required
                        id="title"
                        name="Titre"
                        label="Titre"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={authors}
                        onChange={handleChangeAuthors}
                        required
                        id="author"
                        name="Auteur"
                        label="Auteur"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <Select
                    label='Catégories'
                    name='Catégories'
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti={true}
                    options={categories}
                    styles={selectStyles}
                />
                </Grid>
                <Grid item xs={12}>
                    <TextareaAutosize
                        className={classes.description} 
                        aria-label="minimum height" 
                        rowsMin={10} 
                        placeholder="Description"
                        value={description}
                        onChange={handleChangeDescription}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button className={classes.button} variant="contained" color="primary">
                            Valider
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Column>
    );
}