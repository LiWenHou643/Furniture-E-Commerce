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

const newsArticles = [
    {
        id: 1,
        title: 'Hot Sale: Up to 50% off on all Furniture!',
        date: 'December 20, 2024',
        description:
            'Our biggest sale of the year! Don’t miss out on discounts up to 50% off on all furniture items. Limited time only!',
        content:
            'Get ready for our hot sale! Starting December 20, 2024, enjoy discounts up to 50% on a wide selection of furniture. Whether you’re looking for a new sofa, bed, or dining set, we’ve got the perfect deal for you. Hurry, the sale ends soon!',
        thumbnail: 'https://example.com/sale-thumbnail.jpg', // Add your image URL here
    },
    {
        id: 2,
        title: 'Grand Opening of Our New Branch in Downtown!',
        date: 'December 15, 2024',
        description:
            'We are excited to announce the opening of our new branch in Downtown. Visit us and explore our latest collection!',
        content:
            'We’re thrilled to welcome you to our new store in Downtown! Come celebrate our grand opening and enjoy exclusive discounts and offers only available in-store. Our new location is filled with the latest furniture trends and offers a relaxing shopping experience.',
        thumbnail: 'https://example.com/grand-opening-thumbnail.jpg', // Add your image URL here
    },
    {
        id: 3,
        title: 'New Collection Launch: Contemporary Living Room Sets',
        date: 'December 10, 2024',
        description:
            'Introducing our new collection of modern and stylish living room furniture sets. Check out our latest designs!',
        content:
            'We’ve just launched a stunning new collection of contemporary living room sets! Whether you’re looking for a minimalist design or something more luxurious, our new collection has something for everyone. Visit our store or shop online today!',
        thumbnail: 'https://example.com/collection-thumbnail.jpg', // Add your image URL here
    },
];

const NewsPage = () => {
    const navigate = useNavigate();

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
                {newsArticles.map((article) => (
                    <Grid item xs={12} sm={6} md={4} key={article.id}>
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
                                image={article.thumbnail}
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
                                    {article.date}
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
                                    onClick={() => handleReadMore(article.id)}
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
    const article = newsArticles.find((article) => article.id === articleId);

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
