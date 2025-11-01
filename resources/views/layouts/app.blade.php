<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SRB MOTORS - @yield('title', 'Home')</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" rel="noopener">
    
    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    
    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ asset('assets/icon/logo trans.png') }}" type="image/x-icon">
    
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    @yield('styles')
</head>
<body>
    
    @include('partials.header')
    
    <main>
        @yield('content')
    </main>
    
    @include('partials.footer')
    
    <!-- Swiper JS -->
    <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
    
    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    
    @vite(['resources/js/app.js'])
    
    <script>
        // Custom smooth scrolling and navbar overlap handling
        document.addEventListener('DOMContentLoaded', function() {
            // Get the header element
            const header = document.querySelector('.header');
            
            // Handle anchor links to prevent navbar overlap
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            
            anchorLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if(targetId === '#' || !document.querySelector(targetId)) return;
                    
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(targetId);
                    if(targetElement) {
                        // Calculate offset based on whether header is in scrolled state
                        let navbarHeight = 80; // Default navbar height
                        if (header.classList.contains('scrolled')) {
                            navbarHeight = 70; // Smaller navbar height when scrolled
                        }
                        
                        const offsetPosition = targetElement.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Handle direct URL anchors (when loading a page with # in the URL)
            if(window.location.hash) {
                setTimeout(function() {
                    const hashElement = document.querySelector(window.location.hash);
                    if(hashElement) {
                        let navbarHeight = 80; // Default navbar height
                        if (header.classList.contains('scrolled')) {
                            navbarHeight = 70; // Smaller navbar height when scrolled
                        }
                        
                        const offsetPosition = hashElement.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
            
            // Adjust scroll position when scrolling to account for navbar height changes
            let ticking = false;
            
            function updateScrollPosition() {
                ticking = false;
                
                // This can help adjust for navbar changes during scrolling
                // but we'll only do it when necessary
            }
            
            function requestTick() {
                if(!ticking) {
                    requestAnimationFrame(updateScrollPosition);
                    ticking = true;
                }
            }
            
            window.addEventListener('scroll', requestTick);
        });
    </script>
    
    @yield('scripts')
</body>
</html>