import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import ReactStoreBadges from 'react-store-badges';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import LOGO from '../../assets/png/BookApp_logo.png';

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#ECECE5',
    },
    imageList: {
        flexWrap: 'nowrap',
        height: window.innerHeight * 0.4,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        marginBottom:30,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    title: {
        color: "#ECECE5",
    }
});

const itemData = [
    {
        img: LOGO,
        title: 'BookWorm Team',
        link: 'https://github.com/orgs/BookAppPA/dashboard'
    },
];

function Settings() {
    const classes = useStyles();

    const goToGit = (url) => {
        window.open(url, '_blank');
    };

    return (
        <Column>
            <Column>
            <a href='mailto:bookapppa@gmail.com.tld?subject=Feedback'>bookapppa@gmail.com</a>
            <p>Fait avec : ReactJs, Firebase, NodeJS
                <p>UI: MaterialUI</p>
            </p>
                <div className={classes.root}>
                    <ImageList className={classes.imageList} cols={1} rowHeight={window.innerHeight * 0.3} >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img}>
                                <img style={{objectFit:'cover'}} src={item.img} alt={item.title} />
                                <ImageListItemBar
                                    title={item.title}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                    actionIcon={
                                        <IconButton aria-label={`star ${item.title}`} onClick={()=> goToGit(item.link)}>
                                            <GitHubIcon className={classes.title} />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </Column>
            <Row
                wrap
                flexGrow={1}
                horizontal='center'
            >
                <div>
                    <ReactStoreBadges
                        platform={'ios'}
                        url={'https://apps.apple.com/fr/app/bookworm/id1574560284'}
                        locale={'fr-fr'}
                    />

                    <ReactStoreBadges
                        platform={'android'}
                        url={'YOUR_PLAY_STORE_URL'}
                        locale={'fr-fr'}
                    />
                </div>
            </Row>
        </Column>
    );
}

export default Settings;
