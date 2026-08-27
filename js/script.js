document.addEventListener("DOMContentLoaded", () => {


    const menuButton =
        document.querySelector(".mobile-menu-btn");

    const navigation =
        document.querySelector(".navigation");

    if (menuButton && navigation) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.addEventListener("click", () => {

            navigation.classList.toggle("active");

            const isOpen =
                navigation.classList.contains("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.innerHTML = isOpen
                ? '<i class="bi bi-x-lg"></i>'
                : '<i class="bi bi-list"></i>';

        });


        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.innerHTML =
                    '<i class="bi bi-list"></i>';

            });

        });

    }


    const navbar =
        document.querySelector(".main-navbar");

    function handleNavbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );

    handleNavbarScroll();


    const revealElements =
        document.querySelectorAll(
            ".reveal, .section-heading, .story-content, .product-card, .occasion-card, .trend-item, .look, .journal-story"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    const bagButtons =
        document.querySelectorAll(".add-to-bag");

    const bagCount =
        document.querySelector(".bag-button span");

    let cartCount = 0;


    bagButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            cartCount++;


            if (bagCount) {

                bagCount.textContent = cartCount;

            }


            const originalText =
                button.innerHTML;


            button.innerHTML =
                '<span>Added to Bag</span> <i class="bi bi-check2"></i>';


            button.classList.add("added");


            setTimeout(() => {

                button.innerHTML =
                    originalText;

                button.classList.remove("added");

            }, 1500);

        });

    });


    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    const newsletterForm =
        document.querySelector(".newsletter-form");


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const input =
                    newsletterForm.querySelector(
                        "input[type='email']"
                    );


                if (!input) return;


                const email =
                    input.value.trim();


                if (!email) {

                    input.focus();

                    alert(
                        "Please enter your email address."
                    );

                    return;

                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    input.focus();

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                alert(
                    "Thank you for subscribing to S4K By Laxmi."
                );


                input.value = "";

            }
        );

    }


    const backToTop =
        document.querySelector(".back-to-top");


    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    backToTop.classList.add(
                        "visible"
                    );

                } else {

                    backToTop.classList.remove(
                        "visible"
                    );

                }

            },
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    const searchButton =
        document.querySelector(".search-button");

    let searchBox =
        document.querySelector(".search-box");

    let searchInput =
        document.querySelector("#searchInput");


    if (searchButton) {

        
        if (!searchBox) {

            searchBox =
                document.createElement("div");

            searchBox.className =
                "search-box";

            searchBox.innerHTML = `
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search anything..."
                    autocomplete="off"
                    aria-label="Search"
                >
            `;

            document.body.appendChild(searchBox);

        }


        searchInput =
            searchBox.querySelector("#searchInput");


        
        let searchMessage =
            searchBox.querySelector(".search-message");


        if (!searchMessage) {

            searchMessage =
                document.createElement("div");

            searchMessage.className =
                "search-message";

            searchBox.appendChild(searchMessage);

        }


    
        const normalizeSearchText = (text) => {

            return text
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\w\s-]/g, " ")
                .replace(/\s+/g, " ")
                .trim();

        };


        
        searchButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                searchBox.classList.toggle("active");


                if (
                    searchBox.classList.contains("active")
                ) {

                    if (searchInput) {

                        setTimeout(() => {
                            searchInput.focus();
                        }, 100);

                    }

                } else {

                    if (searchInput) {
                        searchInput.value = "";
                    }

                    searchMessage.textContent = "";

                    searchMessage.classList.remove(
                        "show"
                    );


                    
                    document
                        .querySelectorAll(
                            ".product-card, .occasion-card, .trend-item, .look, .journal-story, .category-card, .category-box, .collection-card"
                        )
                        .forEach(item => {

                            item.style.display = "";

                        });

                }

            }
        );



        if (searchInput) {

            searchInput.addEventListener(
                "input",
                () => {

                    const searchValue =
                        normalizeSearchText(
                            searchInput.value
                        );


                    
                    const searchItems =
                        document.querySelectorAll(
                            ".product-card, .occasion-card, .trend-item, .look, .journal-story, .category-card, .category-box, .collection-card"
                        );


                    
                    if (searchValue === "") {

                        searchItems.forEach(item => {

                            item.style.display = "";

                        });


                        searchMessage.textContent = "";

                        searchMessage.classList.remove(
                            "show"
                        );

                        return;

                    }


                    let matchedCount = 0;


                    
                    searchItems.forEach(item => {

                        const itemText =
                            normalizeSearchText(
                                item.textContent || ""
                            );


                        const image =
                            item.querySelector("img");


                        const imageText =
                            image
                                ? normalizeSearchText(
                                    `${image.alt || ""} ${image.title || ""}`
                                )
                                : "";


                        const dataSearch =
                            normalizeSearchText(
                                item.getAttribute(
                                    "data-search"
                                ) || ""
                            );


                        const elementInfo =
                            normalizeSearchText(
                                `${item.id || ""} ${item.className || ""}`
                            );


                        const searchableText =
                            `${itemText} ${imageText} ${dataSearch} ${elementInfo}`;


                        const searchWords =
                            searchValue.split(" ");


                        const isMatch =
                            searchWords.every(word =>
                                searchableText.includes(word)
                            );


                        if (isMatch) {

                            item.style.display = "";

                            matchedCount++;

                        } else {

                            item.style.display = "none";

                        }

                    });


                    if (matchedCount > 0) {

                        searchMessage.textContent =
                            `${matchedCount} result${matchedCount === 1 ? "" : "s"} found`;

                        searchMessage.classList.add(
                            "show"
                        );

                    } else {

                        searchMessage.textContent =
                            `No results found for "${searchInput.value.trim()}"`;

                        searchMessage.classList.add(
                            "show"
                        );

                    }

                }
            );


            searchInput.addEventListener(
                "keydown",
                event => {

                    if (event.key !== "Enter") {
                        return;
                    }


                    event.preventDefault();


                    const searchValue =
                        normalizeSearchText(
                            searchInput.value
                        );


                    if (!searchValue) {
                        return;
                    }


                    const searchItems =
                        document.querySelectorAll(
                            ".product-card, .occasion-card, .trend-item, .look, .journal-story, .category-card, .category-box, .collection-card"
                        );


                    let firstMatch = null;


                    searchItems.forEach(item => {

                        if (firstMatch) {
                            return;
                        }


                        const itemText =
                            normalizeSearchText(
                                item.textContent || ""
                            );


                        const image =
                            item.querySelector("img");


                        const imageText =
                            image
                                ? normalizeSearchText(
                                    `${image.alt || ""} ${image.title || ""}`
                                )
                                : "";


                        const dataSearch =
                            normalizeSearchText(
                                item.getAttribute(
                                    "data-search"
                                ) || ""
                            );


                        const elementInfo =
                            normalizeSearchText(
                                `${item.id || ""} ${item.className || ""}`
                            );


                        const searchableText =
                            `${itemText} ${imageText} ${dataSearch} ${elementInfo}`;


                        const searchWords =
                            searchValue.split(" ");


                        const isMatch =
                            searchWords.every(word =>
                                searchableText.includes(word)
                            );


                        if (isMatch) {

                            firstMatch = item;

                        }

                    });


                    if (firstMatch) {

                        firstMatch.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });


                        firstMatch.classList.add(
                            "search-match"
                        );


                        setTimeout(() => {

                            firstMatch.classList.remove(
                                "search-match"
                            );

                        }, 1500);

                    }

                }
            );


            
            searchInput.addEventListener(
                "keydown",
                event => {

                    if (event.key === "Escape") {

                        searchBox.classList.remove(
                            "active"
                        );

                        searchInput.value = "";

                        searchMessage.textContent = "";

                        searchMessage.classList.remove(
                            "show"
                        );


                        document
                            .querySelectorAll(
                                ".product-card, .occasion-card, .trend-item, .look, .journal-story, .category-card, .category-box, .collection-card"
                            )
                            .forEach(item => {

                                item.style.display = "";

                            });

                    }

                }
            );

        }

    }


    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    productCards.forEach(card => {

        const image =
            card.querySelector("img");


        if (!image) return;


        card.addEventListener(
            "mouseenter",
            () => {

                image.style.transform =
                    "scale(1.06)";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "scale(1)";

            }
        );

    });



    document.querySelectorAll(
        "button"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.blur();

            }
        );

    });

});