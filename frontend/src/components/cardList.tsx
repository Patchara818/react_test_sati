import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";

const CardList = (props: any) => {

    const { data } = props; // Data Params

    return (
        <Grid container spacing={1} data-testid="images-list">
            {data && data.map((item: any, index: number) => ( // For Data
                <Grid item xs={12} md={4} key={item.id} data-testid="image-item">
                    <Card variant="outlined">
                        <CardMedia
                            component="img"
                            alt="image-alt"
                            height={300}
                            width="100%"
                            image={item.url}
                            loading="lazy"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Size: {item.width} x {item.height}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardList;
