from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    path("", views.OrderAPIView.as_view()),
    path("list/", views.OrderListAPIView.as_view()),
    path("seller/list/", views.SellerOrderListAPIView.as_view()),
    path("pending/list/", views.PendingOrderListAPIView.as_view()),
    path("payment/", csrf_exempt(views.CreateCheckOutSession.as_view())),
    path("payment/complete/", csrf_exempt(views.PaymentCompleteAPIView.as_view()),
         name='payment-complete'),
    # path("hook/", views.stripe_webhook_view),
    path('review/<pk>/', views.ReviewAPIView.as_view()),
    path('check-review/<pk>/', views.UserReviewAPIView.as_view()),
    path("deliver/", views.DeliveryOrderAPIView.as_view()),
    path("deliver/<pk>/", views.AssignDeliverManAPIView.as_view()),
    path("status/<pk>/", views.OrderStatusAPIView.as_view()),
    path("total-income/", views.TotalIncomeAPIView.as_view()),
    path("total-income/year-list/", views.TotalIncomeByYearAPIView.as_view()),
    path("total-income/month-list/<year>/",
         views.TotalIncomeByMonthAPIView.as_view()),
    path("total-income/day-list/<year>/<month>/",
         views.TotalIncomeByDayAPIView.as_view()),
    path("total-income/day-list/<year>/<month>/<day>/",
         views.DayIncomeAPIView.as_view()),

]
