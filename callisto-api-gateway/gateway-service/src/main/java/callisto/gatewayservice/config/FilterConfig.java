package callisto.gatewayservice.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;

public class FilterConfig {

    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r -> r.path("/admin/**")
                        .filters(f -> f.addRequestHeader("admin-request", "admin-request-header")
                                .addResponseHeader("admin-response", "admin-response-header"))
                        .uri("http://localhost:3000/"))
                .build();

    }
}
