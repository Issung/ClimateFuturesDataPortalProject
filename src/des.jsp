<%
    String area = request.getParameter("area");
    Object variables = request.getParameter("variables");
    String stime=request.getParameter("stime");
    String etime=request.getParameter("etime");
    String ensemble_members=request.getParameter("ensemble_members");

    out.println(area+"\n"+variables+"\n"+stime+"\n"+etime+"\n"+ensemble_members);
%>