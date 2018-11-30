<?php

namespace App\Http\Middleware;

use Closure;

class CheckDomain
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $email = $request->email;
        $domain_name = 'http://' . substr(strrchr($email, "@"), 1);

        $client = new \GuzzleHttp\Client();

        try {
            $res = $client->request('GET', $domain_name);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            return response()->json([
                'message' => 'Invalid Email'
            ], 403);
        } catch (\GuzzleHttp\Exception\ConnectException $e) {
            return response()->json([
                'message' => 'Invalid Email'
            ], 403);
        } 
        
        return $next($request);
    }
}
