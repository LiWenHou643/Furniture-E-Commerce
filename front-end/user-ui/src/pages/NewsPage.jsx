import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import useFetchNews from '../hooks/useFetchNews';

const NewsPage = () => {
    const navigate = useNavigate();
    const { data: newsArticles, isLoading } = useFetchNews('newsArticles');

    if (isLoading) {
        return <Loading />;
    }

    const handleReadMore = (id) => {
        navigate(`/news/${id}`);
    };

    return (
        <Container sx={{ mt: 15 }}>
            <Typography
                variant='h4'
                align='center'
                sx={{ marginBottom: '30px' }}
            >
                Latest News and Updates
            </Typography>

            <Grid container spacing={4}>
                {newsArticles?.map((article) => (
                    <Grid item xs={12} sm={6} md={4} key={article.newsId}>
                        <Card
                            sx={{
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                            }}
                        >
                            {/* Display the Thumbnail */}
                            <CardMedia
                                component='img'
                                height='200'
                                image={article.imageUrl}
                                alt={article.title}
                                sx={{ objectFit: 'cover' }} // Ensure the image covers the area
                            />
                            <CardContent>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 'bold',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {article.title}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    sx={{ marginBottom: '10px' }}
                                >
                                    {new Date(article.createdAt).toDateString()}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.primary'
                                    sx={{ marginBottom: '20px' }}
                                >
                                    {article.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size='small'
                                    color='primary'
                                    onClick={() =>
                                        handleReadMore(article.newsId)
                                    }
                                >
                                    Read More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

const ArticleDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const articleId = parseInt(id, 10); // Convert to integer
    const article = {
        id: 1,
        title: 'Article Title',
        date: '2021-10-01',
        content: 'This is thecontent of the article',
        thumbnail: 'https://example.com/article-thumbnail.jpg',
    };

    if (articleId !== article.id) {
        return <Loading />;
    }

    if (!article) {
        return <Typography variant='h5'>Article not found</Typography>;
    }

    return (
        <Container sx={{ mt: 15 }}>
            {/* Display the Article Thumbnail */}
            <CardMedia
                component='img'
                height='300'
                image={
                    article.thumbnail ||
                    'https://example.com/default-thumbnail.jpg'
                } // Default if no thumbnail
                alt={article.title}
                sx={{ objectFit: 'cover', marginBottom: '20px' }}
            />

            <Typography
                variant='h3'
                sx={{ fontWeight: 'bold', marginBottom: '20px' }}
            >
                {article.title}
            </Typography>
            <Typography
                variant='body1'
                color='text.secondary'
                sx={{ marginBottom: '30px' }}
            >
                {article.date}
            </Typography>
            <Typography variant='body1' paragraph>
                {article.content}
            </Typography>

            {/* Back to News button */}
            <Button
                variant='contained'
                sx={{ marginTop: '20px' }}
                onClick={() => navigate('/news')}
            >
                Back to News
            </Button>
        </Container>
    );
};

export { ArticleDetailPage, NewsPage };
