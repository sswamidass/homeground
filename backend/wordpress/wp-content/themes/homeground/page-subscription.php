<?php
/* Template Name: Subscription Page */
get_header();
?>

<main id="site-content" class="subscription">
  <?php while ( have_posts() ) : the_post(); ?>
    <section class="subscription-hero">
        <div class="container">
            <h1><?php the_title(); ?></h1>
            <?php if ( has_excerpt() ) : ?>
                <p class="subscription-lead"><?php the_excerpt(); ?></p>
            <?php endif; ?>
        </div>
    </section>

    <section class="pricing-section section">
        <div class="container">
            <div class="plans-grid">
                <div class="plan-card">
                    <h3>Monthly</h3>
                    <div class="plan-price">
                        <span class="price-amount">$42</span>
                        <span class="price-billing">per month</span>
                    </div>
                    <ul class="plan-features">
                        <li>One book + one bag of coffee</li>
                        <li>Educational fact card</li>
                        <li>Family activity or craft</li>
                        <li>Free shipping in Great Lakes region</li>
                        <li>Cancel anytime</li>
                    </ul>
                    <button class="btn btn-primary plan-button">Select Plan</button>
                </div>

                <div class="plan-card popular">
                    <div class="popular-badge">Most Popular</div>
                    <h3>3-Month</h3>
                    <div class="plan-price">
                        <span class="price-amount">$115</span>
                        <span class="price-billing">billed quarterly</span>
                    </div>
                    <div class="plan-savings">Save $11</div>
                    <ul class="plan-features">
                        <li>Everything in Monthly</li>
                        <li>$38.33 per box</li>
                        <li>Priority customer support</li>
                        <li>Exclusive seasonal extras</li>
                        <li>Flexible delivery schedule</li>
                    </ul>
                    <button class="btn btn-primary plan-button">Select Plan</button>
                </div>

                <div class="plan-card">
                    <h3>6-Month</h3>
                    <div class="plan-price">
                        <span class="price-amount">$220</span>
                        <span class="price-billing">billed semi-annually</span>
                    </div>
                    <div class="plan-savings">Save $32</div>
                    <ul class="plan-features">
                        <li>Everything in 3-Month</li>
                        <li>$36.67 per box</li>
                        <li>Bonus welcome gift</li>
                        <li>Exclusive roaster discounts</li>
                        <li>Gift one box to a friend</li>
                    </ul>
                    <button class="btn btn-primary plan-button">Select Plan</button>
                </div>
            </div>

            <div class="subscription-note">
                <p>All plans automatically renew. You can pause or cancel anytime from your account dashboard.</p>
            </div>
        </div>
    </section>

    <section class="value-section section" style="background-color: var(--sandy-beige);">
        <div class="container">
            <h2>What You're Really Getting</h2>
            <div class="value-breakdown">
                <div class="value-item">
                    <div class="value-amount">$22</div>
                    <p>Hardcover children's book<br/>(Retail value)</p>
                </div>
                <div class="value-plus">+</div>
                <div class="value-item">
                    <div class="value-amount">$16</div>
                    <p>12 oz artisan coffee<br/>(Retail value)</p>
                </div>
                <div class="value-plus">+</div>
                <div class="value-item">
                    <div class="value-amount">$8</div>
                    <p>Activities & educational materials</p>
                </div>
                <div class="value-equals">=</div>
                <div class="value-item total">
                    <div class="value-amount">$46</div>
                    <p>Total retail value<br/><strong>You pay $42/month</strong></p>
                </div>
            </div>
            <p class="value-note">
                Plus, you're supporting local Great Lakes authors, illustrators, and roasters with every box!
            </p>
        </div>
    </section>

    <section class="gifting-section section">
        <div class="container">
            <div class="gifting-content">
                <div class="gifting-text">
                    <h2>Give the Gift of Adventure</h2>
                    <p>
                        Homeground makes a perfect gift for families, grandchildren, teachers, or anyone who loves
                        the Great Lakes. Choose a 3 or 6-month gift subscription and we'll include a beautiful
                        greeting card with your personalized message.
                    </p>
                    <ul class="gifting-benefits">
                        <li>Delivered with a custom greeting card</li>
                        <li>Flexible start date—choose when first box arrives</li>
                        <li>Gift recipient can manage their own delivery schedule</li>
                        <li>No automatic renewal on gift subscriptions</li>
                        <li>Perfect for birthdays, holidays, or just because</li>
                    </ul>
                    <button class="btn btn-secondary">Give a Gift Subscription</button>
                </div>
                <div class="gifting-visual">
                    <img
                        src="https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Gift wrapped subscription box"
                        class="gifting-image"
                    />
                </div>
            </div>
        </div>
    </section>

    <section class="testimonials-section section" style="background-color: var(--off-white);">
        <div class="container">
            <h2>What Subscribers Are Saying</h2>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-quote">"Homeground has become our favorite family tradition. The books are exceptional and the coffee keeps me going through bedtime stories!"</p>
                    <div class="testimonial-author">
                        <strong>Rachel K.</strong>
                        <span>Chicago, IL</span>
                        <span class="testimonial-plan">6-Month Subscriber</span>
                    </div>
                </div>

                <div class="testimonial-card">
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-quote">"I gifted this to my sister and her kids. They absolutely love it! The educational content is top-notch."</p>
                    <div class="testimonial-author">
                        <strong>David M.</strong>
                        <span>Toronto, ON</span>
                        <span class="testimonial-plan">3-Month Gift</span>
                    </div>
                </div>

                <div class="testimonial-card">
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-quote">"As a teacher and parent, I appreciate the quality and thoughtfulness of every box. Worth every penny!"</p>
                    <div class="testimonial-author">
                        <strong>Amanda S.</strong>
                        <span>Grand Rapids, MI</span>
                        <span class="testimonial-plan">Monthly Subscriber</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="faq-preview section">
        <div class="container">
            <h2>Common Questions</h2>
            <div class="faq-grid">
                <div class="faq-item">
                    <h3>When will my first box ship?</h3>
                    <p>Orders placed before the 15th of the month ship that month. Orders after the 15th ship the following month.</p>
                </div>
                <div class="faq-item">
                    <h3>Can I pause my subscription?</h3>
                    <p>Absolutely! You can pause for up to 3 months or cancel anytime from your account dashboard with no penalties.</p>
                </div>
                <div class="faq-item">
                    <h3>What age are the books appropriate for?</h3>
                    <p>Most books are designed for ages 4-12. Each month's book includes an age range recommendation.</p>
                </div>
                <div class="faq-item">
                    <h3>Do you ship outside the Great Lakes region?</h3>
                    <p>Yes! We ship anywhere in the US and Canada. Shipping is free for Great Lakes states/provinces.</p>
                </div>
            </div>
            <p class="faq-link">Have more questions? <a href="<?php echo esc_url( home_url('/faq/') ); ?>">Visit our FAQ page</a></p>
        </div>
    </section>
  <?php endwhile; ?>
</main>

<?php get_footer(); ?>
