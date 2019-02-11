<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    <!-- Scripts -->
    <script src="https://maps.googleapis.com/maps/api/js?key={{config('beacon-bacon.google.api_key')}}"
            async
            defer>
    </script>

    <script src='https://npmcdn.com/@turf/turf/turf.min.js'></script>

    <script>
        window.baseUrl = "{{config('beacon-bacon.api.url')}}";
        window.apiKey = "{{config('beacon-bacon.api.key')}}";
    </script>
</head>
<body>
<div id="app">
    <app></app>
    <portal-target name="modals"></portal-target>
</div>

<!-- Scripts -->
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
