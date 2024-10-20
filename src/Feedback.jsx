import React from "react";

const CustomerFeeback = () => {
    const Feedback = [
        {
            text: "The services were exceptional, and we are very satisfied with the quality delivered.",
            customerName: "John Smith",
            stars: 4.5
        },
        {
            text: "The team was professional and met all our expectations.",
            customerName: "Emma Thompson",
            stars: 4
        },
        {
            text: "We had a great experience, and we would definitely recommend their services.",
            customerName: "Oliver Brown",
            stars: 5
        }
    ];
    

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<i key={i} className="fas fa-star text-warning"></i>);
            } else if (i === fullStars && halfStar) {
                stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>);
            } else {
                stars.push(<i key={i} className="far fa-star text-warning"></i>);
            }
        }
        return stars;
    };

    return (
        <div className="pt-3 pb-3 bg-dark text-light rounded">
            <div
                id="customer-testimonial-carousel"
                className="carousel slide"
                data-bs-ride="carousel"
                style={{ height: "200px" }}
            >
                <div className="carousel-inner" role="listbox">
                    {Feedback.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""} text-center p-4`}
                        >
                            <blockquote className="blockquote text-center">
                                <p className="mb-0">
                                    <i className="fa fa-quote-left"></i> {testimonial.text}
                                </p>
                                <p className="mb-0 text-muted fs-3">
                                    - {testimonial.customerName}
                                </p>
                                <p className="client-review-stars mt-2">{renderStars(testimonial.stars)}</p>
                            </blockquote>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#customer-testimonial-carousel"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#customer-testimonial-carousel"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                <ol className="carousel-indicators list-unstyled">
                    {Feedback.map((_, index) => (
                        <li
                            key={index}
                            data-bs-target="#customer-testimonial-carousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                        ></li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default CustomerFeeback;
